#!/bin/bash
schemacrawler -server sqlite \
  -database db.sqlite3 \
  -user -password \
  -infolevel standard \
  -command schema \
  -outputformat png \
  -loglevel INFO \
  -outputfile OUTPUT_IMAGE_FILE.png
