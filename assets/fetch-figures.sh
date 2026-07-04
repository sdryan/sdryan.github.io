#!/usr/bin/env bash
# Run this once, from inside the site/assets/ folder, to pull your
# simulation figures off the old CSU site and store them locally.
# After this, the research page loads its own copies and no longer
# depends on the university server.
#
#   cd site/assets
#   bash fetch-figures.sh
#
set -e
base="https://academic.csuohio.edu/ryan-shawn/wp-content/uploads/sites/66"

curl -L -o fig-bacteria.png          "$base/2022/05/bact.png"
curl -L -o fig-viscosity.png         "$base/2022/05/ev.png"
curl -L -o fig-lees-edwards.png      "$base/2022/05/le_bcs.png"
curl -L -o fig-vortex.png            "$base/2022/05/vort.png"
curl -L -o fig-ants.png              "$base/2022/05/ant_trail.png"
curl -L -o fig-foam.gif             "$base/2022/05/gif.gif"
curl -L -o fig-ginzburg.png          "$base/2022/06/gl_rand-1024x379.png"
curl -L -o fig-graphene-model.png    "$base/2022/06/graphene_model.png"
curl -L -o fig-graphene-stability.png "$base/2022/06/graphene_stability.png"
curl -L -o fig-group.png             "$base/2023/01/RyanGroup-1024x533.png"

echo "Done. Ten figures saved to $(pwd)."
