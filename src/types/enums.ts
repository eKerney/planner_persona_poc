export enum Basemaps {
  STREETS_NIGHT_VECTOR = "streets-night-vector",
  DARK_GRAY = "dark-gray",
  TOPO = "topo",
  SATELLITE = "satellite",
}

export enum LoadingStatus {
  WAITING = "waiting",
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

export enum DataStatus {
  DATAIMPORTED = 0,
  DATASUBMITTED = 1,
  FIELDSRETURNED = 2,
  FIELDSMATCHED = 3,
  DATAAPPROVED = 4,
  IMPORTTODATABASE = 5,
  DATADENIED = 6
}

export enum RequestType {
  IMPORT = "Import",
  INGEST = "Ingest",
  PREPROCESS = "Preprocess",
  UPLOAD = "Upload",
  COMPLETED = "Completed",
  FETCH = "Fetch"
}
