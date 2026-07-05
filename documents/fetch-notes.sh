#!/usr/bin/env bash
# Run this ONCE, from inside site/documents/, to pull your open lecture
# notes off the old CSU site and store them here. After this, the Teaching
# page serves its own copies and no longer depends on the university server.
#
#   cd site/documents
#   bash fetch-notes.sh
#
set -e
curl -L -o SRyan-ODEPDE-Book.pdf "https://academic.csuohio.edu/shawn-ryan/wp-content/uploads/sites/66/2022/06/SRyan-ODEPDE-Book.pdf"
curl -L -o MathMethodsBook.pdf    "https://academic.csuohio.edu/shawn-ryan/wp-content/uploads/sites/66/2022/06/MathMethodsBook-compressed.pdf"
echo "Done. Two lecture-note PDFs saved to $(pwd)."
