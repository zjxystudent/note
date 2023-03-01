git clone `https:...`

获取提交日志
git log 

回滚。这里的commi-hash就是你想回滚到的某次提交状态的hash值。
git reset --hard commit-hash
回滚结束之后需要强行上传到你项目的gihub。
git push origin HEAD -- force