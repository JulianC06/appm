#!/bin/bash
if curl -I "https://esgeeks.com" 2>&1 | grep -w "200\|301" ; then
    echo "$(date);live" >> status/statusInstance1.txt
else
    echo "$(date);die" >> status/statusInstance1.txt
fi

if curl -I "https://github.com" 2>&1 | grep -w "200\|301" ; then
    echo "$(date);live" >> status/statusInstance2.txt
else
    echo "$(date);die" >> status/statusInstance2.txt
fi