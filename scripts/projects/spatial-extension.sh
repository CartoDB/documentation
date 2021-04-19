#!/bin/sh

REFERENCE_FILEPATH=$1/doc/REFERENCE.md

for file in `find . -regex ".*/$REFERENCE_FILEPATH"`; do \
    MODULE_NAME=`echo $file | sed -r -e "s#.*/(.*)/$REFERENCE_FILEPATH#\1#g"`; \
    if [ $MODULE_NAME != "skel" ]; then \
    echo "- $MODULE_NAME"; \
    mkdir -p "$2"; cp $file "$2/$MODULE_NAME.md"; \
    fi \
done;
