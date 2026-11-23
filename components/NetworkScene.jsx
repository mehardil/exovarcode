"use client";

import { useEffect, useRef } from "react";
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SRGBColorSpace,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

export default function NetworkScene({ compact = false }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let frame = 0;
    let renderer;
    let scene;
    let camera;
    let network;
    let core;
    let resizeObserver;
    let cleanupListeners;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const clock = { start: performance.now() };
    let visible = true;
    let scroll = 0;
    let scrollTarget = 0;

    function boot() {
      scene = new Scene();
      camera = new PerspectiveCamera(48, 1, 0.1, 100);
      camera.position.set(0, 0, 6.4);

      renderer = new WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 1.7));
      renderer.outputColorSpace = SRGBColorSpace;
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";

      const styles = getComputedStyle(document.documentElement);
      const gold = new Color(styles.getPropertyValue("--gold").trim() || "#c9a84c");
      const teal = new Color(styles.getPropertyValue("--teal").trim() || "#7dd3c0");

      network = new Group();
      scene.add(network);

      const nodeCount = compact ? 46 : 72;
      const spread = compact ? 2.1 : 2.35;
      const points = [];
      for (let i = 0; i < nodeCount; i += 1) {
        const theta = Math.acos(2 * Math.random() - 1);
        const phi = Math.random() * Math.PI * 2;
        const radius = spread + (Math.random() - 0.5) * 0.85;
        points.push(
          new Vector3(
            radius * Math.sin(theta) * Math.cos(phi),
            radius * Math.sin(theta) * Math.sin(phi) * 0.82,
            radius * Math.cos(theta),
          ),
        );
      }

      const nodeGeometry = new BufferGeometry().setFromPoints(points);
      const nodeMaterial = new PointsMaterial({
        color: gold,
        size: compact ? 0.05 : 0.055,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
      });
      network.add(new Points(nodeGeometry, nodeMaterial));

      const linePositions = [];
      const maxDistance = compact ? 0.98 : 0.92;
      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          if (points[i].distanceTo(points[j]) < maxDistance) {
            linePositions.push(points[i].x, points[i].y, points[i].z);
            linePositions.push(points[j].x, points[j].y, points[j].z);
          }
        }
      }
      const lineGeometry = new BufferGeometry();
      lineGeometry.setAttribute("position", new Float32BufferAttribute(linePositions, 3));
      const lineMaterial = new LineBasicMaterial({
        color: gold,
        transparent: true,
        opacity: compact ? 0.12 : 0.16,
        depthWrite: false,
      });
      network.add(new LineSegments(lineGeometry, lineMaterial));

      const coreGeometry = new IcosahedronGeometry(compact ? 0.82 : 0.92, 1);
      const coreMaterial = new MeshBasicMaterial({
        color: teal,
        wireframe: true,
        transparent: true,
        opacity: compact ? 0.26 : 0.34,
      });
      core = new Mesh(coreGeometry, coreMaterial);
      network.add(core);

      const ringGeometry = new TorusGeometry(compact ? 1.7 : 1.9, 0.012, 6, 120);
      const ringMaterial = new MeshBasicMaterial({
        color: gold,
        transparent: true,
        opacity: compact ? 0.16 : 0.22,
      });
      const ring = new Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2.35;
      ring.rotation.y = Math.PI / 5;
      network.add(ring);

      if (!compact) {
        const outerGeometry = new IcosahedronGeometry(2.9, 1);
        const outerMaterial = new MeshBasicMaterial({
          color: teal,
          wireframe: true,
          transparent: true,
          opacity: 0.055,
        });
        network.add(new Mesh(outerGeometry, outerMaterial));
      }

      const dustPoints = [];
      const dustCount = compact ? 60 : 120;
      for (let i = 0; i < dustCount; i += 1) {
        const theta = Math.acos(2 * Math.random() - 1);
        const phi = Math.random() * Math.PI * 2;
        const radius = 3.2 + Math.random() * 2.4;
        dustPoints.push(
          new Vector3(
            radius * Math.sin(theta) * Math.cos(phi),
            radius * Math.sin(theta) * Math.sin(phi) * 0.7,
            radius * Math.cos(theta),
          ),
        );
      }
      const dustGeometry = new BufferGeometry().setFromPoints(dustPoints);
      const dustMaterial = new PointsMaterial({
        color: teal,
        size: 0.035,
        sizeAttenuation: true,
        transparent: true,
        opacity: compact ? 0.28 : 0.4,
        depthWrite: false,
      });
      network.add(new Points(dustGeometry, dustMaterial));

      function resize() {
        if (!renderer || !camera || disposed) return;
        const rect = mount.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      resize();

      const onPointerMove = (event) => {
        target.x = (event.clientX / window.innerWidth - 0.5) * 0.6;
        target.y = (event.clientY / window.innerHeight - 0.5) * 0.4;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });

      const onScroll = () => {
        scrollTarget = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      const io = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0.05 },
      );
      io.observe(mount);

      const onVisibility = () => {
        visible = document.visibilityState === "visible";
      };
      document.addEventListener("visibilitychange", onVisibility);

      let last = performance.now();
      const speed = compact ? 0.4 : 0.55;
      function render(now) {
        if (disposed) return;
        frame = requestAnimationFrame(render);
        if (!visible || document.visibilityState !== "visible") {
          last = now;
          return;
        }
        const delta = Math.min(0.05, (now - last) / 1000);
        last = now;

        pointer.x += (target.x - pointer.x) * 0.04;
        pointer.y += (target.y - pointer.y) * 0.04;
        scroll += (scrollTarget - scroll) * 0.05;
        const elapsed = (now - clock.start) / 1000;

        if (network) {
          network.rotation.y += delta * 0.055 * speed;
          network.rotation.x = Math.sin(elapsed * 0.12) * 0.12 + pointer.y * 0.35;
          network.position.x = pointer.x * 0.45;
          network.position.y = -pointer.y * 0.35 - scroll * 0.5;
          network.scale.setScalar(1 + scroll * 0.08);
        }
        if (core) {
          core.rotation.y = elapsed * 0.18 * speed;
          core.rotation.x = elapsed * 0.09 * speed;
        }
        if (camera) {
          camera.position.x = pointer.x * 0.5;
          camera.position.y = -pointer.y * 0.35 + scroll * 0.4;
          camera.position.z = 6.4 + scroll * 0.7;
          camera.lookAt(0, 0, 0);
        }
        renderer.render(scene, camera);
      }

      if (reduced) {
        renderer.render(scene, camera);
      } else {
        frame = requestAnimationFrame(render);
      }

      cleanupListeners = () => {
        io.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("scroll", onScroll);
      };
    }

    boot();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      if (resizeObserver) resizeObserver.disconnect();
      if (cleanupListeners) cleanupListeners();
      if (network) {
        network.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
            else child.material.dispose();
          }
        });
      }
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement?.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, [compact]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
