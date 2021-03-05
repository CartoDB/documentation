import { Vector3 } from 'math.gl';

export function getFrustumPlanes(viewProjectionMatrix) {
  const planes = {};

  planes.left = getFrustumPlane(
    viewProjectionMatrix[3] + viewProjectionMatrix[0],
    viewProjectionMatrix[7] + viewProjectionMatrix[4],
    viewProjectionMatrix[11] + viewProjectionMatrix[8],
    viewProjectionMatrix[15] + viewProjectionMatrix[12],
  );
  planes.right = getFrustumPlane(
    viewProjectionMatrix[3] - viewProjectionMatrix[0],
    viewProjectionMatrix[7] - viewProjectionMatrix[4],
    viewProjectionMatrix[11] - viewProjectionMatrix[8],
    viewProjectionMatrix[15] - viewProjectionMatrix[12],
  );
  planes.bottom = getFrustumPlane(
    viewProjectionMatrix[3] + viewProjectionMatrix[1],
    viewProjectionMatrix[7] + viewProjectionMatrix[5],
    viewProjectionMatrix[11] + viewProjectionMatrix[9],
    viewProjectionMatrix[15] + viewProjectionMatrix[13],
  );
  planes.top = getFrustumPlane(
    viewProjectionMatrix[3] - viewProjectionMatrix[1],
    viewProjectionMatrix[7] - viewProjectionMatrix[5],
    viewProjectionMatrix[11] - viewProjectionMatrix[9],
    viewProjectionMatrix[15] - viewProjectionMatrix[13],
  );
  planes.near = getFrustumPlane(
    viewProjectionMatrix[3] + viewProjectionMatrix[2],
    viewProjectionMatrix[7] + viewProjectionMatrix[6],
    viewProjectionMatrix[11] + viewProjectionMatrix[10],
    viewProjectionMatrix[15] + viewProjectionMatrix[14],
  );
  planes.far = getFrustumPlane(
    viewProjectionMatrix[3] - viewProjectionMatrix[2],
    viewProjectionMatrix[7] - viewProjectionMatrix[6],
    viewProjectionMatrix[11] - viewProjectionMatrix[10],
    viewProjectionMatrix[15] - viewProjectionMatrix[14],
  );

  return planes;
}

const scratchVector = new Vector3();

function getFrustumPlane(a, b, c, d) {
  scratchVector.set(a, b, c);
  const L = scratchVector.len();
  return { distance: d / L, normal: new Vector3(-a / L, -b / L, -c / L) };
}
