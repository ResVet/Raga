# Licence for models, data and content

The files in `public/models/`, `public/data/` and `content/` are licensed under the
[Creative Commons Attribution-ShareAlike 4.0 International licence (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).

They are adapted from:

- **Z-Anatomy, the libre 3D atlas of anatomy**, CC BY-SA 4.0, by Gauthier Kervyn (design, 3D, anatomy),
  Marcin Zielinski (Blender add-on) and Lluís Vinent (app). https://github.com/Z-Anatomy/The-blend
- **BodyParts3D**, The Database Center for Life Science, CC BY-SA 2.1 Japan, original model by Kousaku Okubo.
  https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
- **Wikipedia** article texts shipped with Z-Anatomy (`public/data/definitions.json`), CC BY-SA.
- **Terminologia Anatomica 2** name table shipped with Z-Anatomy (`public/data/names-i18n.json` and Latin names in `catalog.json`).

Changes made by Raga: meshes were evaluated, converted to glTF, simplified and compressed; materials were
replaced; landmark positions were computed from Z-Anatomy's label leader lines; left-side landmarks were
mirrored; the descriptions and exam facts in `content/` were written for Raga. Structures that Z-Anatomy took
from non-commercial sources (University of Dundee inner ear model, CC BY-NC-SA; kidney model by Lissie Cowley,
CC BY-NC) are not included.

If you reuse these files, credit "Raga (github.com/ResVet/Raga), Z-Anatomy and BodyParts3D" and share your
adapted version under the same licence.
