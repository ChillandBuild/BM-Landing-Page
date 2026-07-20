"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Code-generated WebGL ambient scene (particle field + wireframe icosahedron
 * cluster) in the Bloom Matrix indigo palette. Deliberately not an image or
 * video asset — the hero visual must be genuinely custom-built, not
 * generic AI-art-style content.
 */
export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | undefined;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      renderer = undefined;
    }
    if (!renderer) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.z = 18;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const PARTICLE_COUNT = 900;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const colorStops = [
      new THREE.Color("#101A3D"),
      new THREE.Color("#3D5AC2"),
      new THREE.Color("#5C7FE0"),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 8 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = radius * Math.cos(phi) - 5;

      const c = colorStops[Math.floor(Math.random() * colorStops.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Normal blending: additive glow washes out to invisible on the light
    // paper background this scene now sits over.
    const material = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const icoGeometry = new THREE.IcosahedronGeometry(4.2, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#3D5AC2"),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const ico = new THREE.Mesh(icoGeometry, icoMaterial);
    ico.position.set(2, -1, -4);
    scene.add(ico);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let isTabVisible = !document.hidden;
    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let isInView = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const handleResize = () => {
      camera.aspect = container.clientWidth / Math.max(container.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer!.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isInView || !isTabVisible) return;

      points.rotation.y += 0.0009;
      points.rotation.x += 0.0002;
      ico.rotation.y += 0.0015;
      ico.rotation.x += 0.0008;

      camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 1.2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer!.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      renderer!.dispose();
      if (renderer!.domElement.parentElement === container) {
        container.removeChild(renderer!.domElement);
      }
    };
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static gradient base: first paint, and the full reduced-motion fallback */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(92,127,224,0.22) 0%, rgba(250,250,248,0) 55%), radial-gradient(ellipse 70% 60% at 12% 85%, rgba(61,90,194,0.14) 0%, rgba(250,250,248,0) 55%), #FAFAF8",
        }}
      />
      {!reducedMotion && <div ref={containerRef} className="absolute inset-0" />}
    </div>
  );
}
