{
  interface Vector2D {
    x: number;
    y: number;
    _brand: '2d';
  }

  const vector2D = (x: number, y: number): Vector2D => {
    return { x, y, _brand: '2d' };
  };

  const calculateNorm = (p: Vector2D) => {
    return Math.sqrt(p.x * p.x + p.y * p.y); // 기존과 동일
  };

  calculateNorm(vector2D(3, 4)); // 5
  const vec3D = { x: 3, y: 4, z: 1 };

  calculateNorm(vec3D); // 5
}
