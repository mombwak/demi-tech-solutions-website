import os
import zipfile
import shutil

dist_dir = 'dist'
output_zip = 'public_html_deployment.zip'

if not os.path.exists(dist_dir):
    print(f"Error: {dist_dir} does not exist.")
    exit(1)

# Remove any existing zip in dist to prevent recursion
dist_zip_path = os.path.join(dist_dir, output_zip)
if os.path.exists(dist_zip_path):
    os.remove(dist_zip_path)

# Mirror image assets into both /assets/images and /src/assets/images in dist for 100% path compatibility
if os.path.exists('public/assets/images'):
    os.makedirs(os.path.join(dist_dir, 'assets', 'images'), exist_ok=True)
    os.makedirs(os.path.join(dist_dir, 'src', 'assets', 'images'), exist_ok=True)
    for img_file in os.listdir('public/assets/images'):
        src_f = os.path.join('public/assets/images', img_file)
        if os.path.isfile(src_f):
            shutil.copy2(src_f, os.path.join(dist_dir, 'assets', 'images', img_file))
            shutil.copy2(src_f, os.path.join(dist_dir, 'src', 'assets', 'images', img_file))

# Ensure .htaccess is fresh in dist
if os.path.exists('public/.htaccess'):
    shutil.copy2('public/.htaccess', os.path.join(dist_dir, '.htaccess'))

# Ensure db schema is included in dist
if os.path.exists('db/schema.sql'):
    os.makedirs(os.path.join(dist_dir, 'db'), exist_ok=True)
    shutil.copy2('db/schema.sql', os.path.join(dist_dir, 'db', 'schema.sql'))

# Ensure native PHP API endpoints in public/api are copied to dist/api
if os.path.exists('public/api'):
    shutil.copytree('public/api', os.path.join(dist_dir, 'api'), dirs_exist_ok=True)

print(f"Creating fresh archive {output_zip} from {dist_dir}...")

with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(dist_dir):
        for file in files:
            if file == output_zip:
                continue
            file_path = os.path.join(root, file)
            # Store relative to dist_dir so files sit in root of zip
            arcname = os.path.relpath(file_path, dist_dir)
            zipf.write(file_path, arcname)
            print(f"  + {arcname}")

# Copy into public and dist so it's accessible everywhere
if os.path.exists('public'):
    shutil.copy2(output_zip, os.path.join('public', output_zip))
if os.path.exists('dist'):
    shutil.copy2(output_zip, os.path.join('dist', output_zip))

file_size = os.path.getsize(output_zip)
print(f"Successfully generated {output_zip} ({file_size:,} bytes).")
