
import os

file_path = r"c:\Users\Jolly\Lumina B\luminaB.html"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# The nested content starts at line 90 (index 89)
# We need to check if it actually starts there to be safe
if len(lines) > 89 and "DOCTYPE" in lines[89]:
    new_lines = lines[89:]
    
    # Unindent by 4 spaces
    final_lines = []
    for line in new_lines:
        if line.startswith("    "):
            final_lines.append(line[4:])
        else:
            final_lines.append(line)
            
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(final_lines)
    print("Successfully fixed the file.")
else:
    print("Could not find the expected nested content at line 90.")
