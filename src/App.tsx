import React, { ReactNode, createContext, useContext, useMemo } from "react";
import styles from "./surface.module.scss";

function App() {
  return (
    <div
      style={{
        padding: 8,
        //@ts-ignore
        // "--depth": "1",
        "counter-reset": "depth",
      }}
    >
      <h1>Surfaces experiment</h1>
      <Surface actualDepth={1}>
        <Surface actualDepth={2}>
          <Surface actualDepth={3}></Surface>
        </Surface>
        <Surface actualDepth={2}></Surface>
      </Surface>
    </div>
  );
}

const SurfaceLayerCtx = createContext(1);
const SurfaceLayerProvider = ({
  depth,
  ...props
}: {
  depth: number;
  children: ReactNode;
}) => <SurfaceLayerCtx.Provider value={depth} {...props} />;
const useSurfaceLayer = () => useContext(SurfaceLayerCtx);

type LayerProps =
  | { addLayer?: number; exactLayer?: never }
  | { addLayer?: never; exactLayer: number };
type SurfaceProps = { children?: ReactNode; actualDepth?: number } & LayerProps;

function Surface({
  children,
  addLayer = 1,
  exactLayer,
  actualDepth = 1,
}: SurfaceProps) {
  const parentLayer = useSurfaceLayer();
  const isExact = typeof exactLayer == "number";

  const layer = isExact ? exactLayer : parentLayer + addLayer;
  // use `relativeDepth = layer - parentLayer`, if depth calculation differs
  const relativeDepth = isExact ? exactLayer : addLayer;

  return (
    <div
      className={[styles.card, styles.surface].join(" ")}
      data-surface-layer={layer}
      data-surface-relative-layer={relativeDepth}
    >
      <SurfaceLayerProvider depth={layer}>
        <div>CTX depth: {parentLayer}</div>
        <div>(Actual depth: {actualDepth})</div>
        {children}
        {/* <DepthPresenter /> */}
      </SurfaceLayerProvider>
    </div>
  );
}

// const regexp = /^\+\d+$/;

// function useDepthIncrement(jump: string | number) {
//   const depthFromCtx = useNestingness();

//   return useMemo(() => {
//     if (typeof jump === "number") return +jump;
//     if (!regexp.test(jump)) throw new Error(`Invalid depth "${jump}"`);

//     const relativeJump = +jump.substring(1);
//     return depthFromCtx + relativeJump;
//   }, [depthFromCtx, jump]);
// }

function DepthPresenter() {
  return <div className={styles.depthPresenter}>Calculated depth: </div>;
}

export default App;
