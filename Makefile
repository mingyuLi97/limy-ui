default: help

create:
	node build/bin/create.js 

reinstall:
	rm -rf yarn.lock node_modules/ && yarn

commit:
	git add . && npx git-cz

serve:
	node build/bin/serve.js

help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明\033[0m"
	@echo "   \033[35mmake create\033[0m\t\t  创建新组件 (mini-card)"
	@echo "   \033[35mmake reinstall\033[0m\t  重新安装依赖"
	@echo "   \033[35mmake commit\033[0m\t\t  使用 commitizen 完成 git 提交"
	@echo "   \033[35mmake serve\033[0m\t\t  运行 demo"
