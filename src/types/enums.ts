export enum Basemaps {
  STREETS_NIGHT_VECTOR = "streets-night-vector",
  DARK_GRAY = "dark-gray",
  TOPO = "topo",
  SATELLITE = "satellite",
}

export enum LoadingStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  EMPTY = "empty",
  UNPROCESSED = "unprocessed",
}

export enum DataSource {
  FILE = "file",
  URL = "url",
  AGOL = "agol",
  OTHER = "other",
  EMPTY = "empty",
}

export enum DataType {
  GEOJSON = "geojson",
  GEODATAFRAME = "geodataframe",
  SHAPEFILE = "shapefile",
  KML = "kml",
  GEODATABASE = "geodatabase",
  GEOPARQUET = "geoparquet",
  EMPTY = "empty",
} 

export enum GeometryType {
  POINT = "Point",
  POLYGON = "Polygon",
  LINESTRING = "LineString",
  EMPTY = "empty",
} 
