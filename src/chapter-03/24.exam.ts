{
  //
  const borough = { name: 'Brooklyn', location: [40.688, -73.979] };
  const loc = borough.location;
  console.log(borough.location);

  loc[0] = 0;
  borough.location;
  console.log(borough.location);
}

{
  interface Coordinate {
    x: number;
    y: number;
  }

  interface BoundingBox {
    x: [number, number];
    y: [number, number];
  }

  interface Polygon {
    exterior: Coordinate[];
    holes: Coordinate[][];
    bbox: BoundingBox;
  }
}

{
  interface Polygon {
    exterior: Coordinate[];
    holes: Coordinate[][];
    bbox: BoundingBox;
  }

  interface Coordinate {
    x: number;
    y: number;
  }

  interface BoundingBox {
    x: [number, number];
    y: [number, number];
  }

  const isPointInPolygon = (polygon: Polygon, pt: Coordinate) => {
    const { bbox } = polygon.bbox;

    if (bbox) {
      const { x, y } = bbox;
      if (pt.x < x[0] || pt.x > x[1] || pt.y < y[0] || pt.y > y[1]) {
        return false;
      }
    }
  };
}
