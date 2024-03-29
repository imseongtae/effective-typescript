{
  const recordRelease = (title: string, date: string) => {
    console.log('Recording album...');
  };

  recordRelease('1959-08-17', 'Kind of Blue');
}

{
  interface Album {
    artist: string;
    title: string;
    recordingType: 'studio' | 'live';
    releaseDate: Date;
  }
  // NOTE: Version. 1
  // const pluck = <T>(records: T[], key: keyof T) => {
  //   return records.map(r => r[key]);
  // };

  // NOTE: Version. 2
  // const pluck = <T, K extends keyof T>(records: T[], key: K) => {
  //   return records.map(r => r[key]);
  // };

  // NOTE: Version. 3
  // const pluck = <T, K extends keyof T>(records: T[], key: K): T[K][] => {
  //   return records.map(r => r[key]);
  // };

  const kindOfBlue: Album = {
    artist: 'Miles Davis',
    title: 'Kind of Blue',
    releaseDate: new Date('1959-08-17'),
    recordingType: 'studio',
  };

  const albums: Album[] = [kindOfBlue];

  console.log(pluck(albums, 'artist'));
  console.log(pluck(albums, 'title'));
  console.log(pluck(albums, 'releaseDate'));
  console.log(pluck(albums, 'recordingType'));
}
