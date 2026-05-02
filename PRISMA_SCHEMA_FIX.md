# Fix Applied

This version fixes the Prisma schema validation error caused by compact one-line enum definitions.

Prisma requires enum values to be written on separate lines, for example:

enum Role {
  student
  instructor
  admin
}

Upload this fixed package to GitHub and redeploy on Vercel.
