const upload = {}

upload.getChunkLength = (id) => {
    return upload.chunks[id].length;
}

upload.pushChunk = (id, chunk, chunkSize) => {
    if (chunk.lengh !== chunkSize) {return false}
    upload.chunks[id] = chunk;
    upload.chunksDone++;
    return true;
}

upload.isCompleted = () => {
    return upload.totalChunks === upload.chunksDone;
}

upload.to = (folder, file, chunkSize) => {
	console.log(folder, file);
	upload.chunkSizes = [];
	upload.chunks = [];
	upload.name = file.name;
	upload.size = file.size;
	upload.chunkSize = chunkSize;
	upload.chunksDone = 0;
	upload.totalChunks = Math.floor(upload.size / upload.chunkSize);
};