#!/bin/bash
cp ./lib/module_template.js /tmp/module_template_backup.js
echo copied backup to /tmp/module_template_backup.js
chmod +x ./lib/command.js && ./lib/command.js src/module_template.tpl > _module_template.js && mv _module_template.js lib/module_template.js
