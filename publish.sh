#!/bin/sh
# Incident-time snapshot. Do not execute this evidence file.
set -eu
mkdir -p /tmp/forecast
tar -xzf "$1" -C /tmp/forecast
cd /tmp/forecast
npm ci
node publish.mjs
