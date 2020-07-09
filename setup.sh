image_version=`date +%Y%m%d%H%M`;
echo $image_version;
# cd vue2docker
git pull --rebase origin master;
docker stop blog-manage;
docker rm blog-manage;
docker build -t blog-manage:$image_version .;
docker images;
docker run -p 10003:80 -d --name blog-manage blog-manage:$image_version;
# -v ~/docker-data/house-web/appsettings.json:/app/appsettings.json -v ~/docker-data/house-web/NLogFile/:/app/NLogFile   --restart=always
docker logs blog-manage;
#É¾³ýbuild¹ý³ÌÖÐ²úÉúµÄ¾µÏñ    #docker image prune -a -f
docker rmi $(docker images -f "dangling=true" -q)
