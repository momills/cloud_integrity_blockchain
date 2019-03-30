//log on https://github.com/lvaccaro/hashfilereader for the complete code

var chunkSize = 1024*1024*10; // bytes
var input = document.getElementById("file");
var new_hash;
function handleFiles() {
    var file = input.files[0];
    if(file===undefined){
        return;
    }
    var SHA256 = CryptoJS.algo.SHA256.create();

    var timeStart = new Date().getTime();
    var timeEnd = 0;
    $("#fileSize").val(humanFileSize(file.size,true));
    chunkSize = parseInt($("#chunkSize").val());

    loading(file,
        function (data) {
            var wordBuffer = CryptoJS.lib.WordArray.create(data);
            SHA256.update(wordBuffer);

        },  function (data) {
            new_hash = SHA256.finalize().toString();
            timeEnd = new Date().getTime();
            $("#timeDelta").val((timeEnd-timeStart)/1000+' sec');
          //  $("#chunkTotal").val(chunkTotal);
          // return new_hash;
        });
        // return;
};

function clearUpload(){
    $("#timeDelta").val('');
    $("#fileSize").val('');

    lastOffset = 0;
    //chunkTotal = 0;
}

// function clearDown(){
//     $("#downName").val('');
//     $("#downTag").val('');
//     $("#downSize").val('');
//
// }
//
// function clearSearch(){
//     $("#tag_search").val('');
//     $("#hash-search").val('');
// }

function loading(file, callbackProgress, callbackFinal) {
  //  var chunkSize  = 1024*1024*10;
    var offset     = 0;
    var size=chunkSize;
    var partial;
    var index = 0;

    if(file.size===0){
        callbackFinal();
    }
    while (offset < file.size) {
        partial = file.slice(offset, offset+size);
        var reader = new FileReader;
        reader.size = chunkSize;
        reader.offset = offset;
        reader.index = index;
        reader.onload = function(evt) {
            callbackRead(this, file, evt, callbackProgress, callbackFinal);
        };
        reader.readAsArrayBuffer(partial);
        offset += chunkSize;
        index += 1;
    }
}

function callbackRead(obj, file, evt, callbackProgress, callbackFinal){
        callbackRead_buffered(obj, file, evt, callbackProgress, callbackFinal);
}

var lastOffset = 0;
var chunkReorder = 0;
// var chunkTotal = 0;

// memory reordering
var previous = [];
function callbackRead_buffered(reader, file, evt, callbackProgress, callbackFinal){
    //chunkTotal++;

    if(lastOffset !== reader.offset){
        // out of order
        console.log("[",reader.size,"]",reader.offset,'->', reader.offset+reader.size,">>buffer");
        previous.push({ offset: reader.offset, size: reader.size, result: reader.result});
        chunkReorder++;
        return;
    }

    function parseResult(offset, size, result) {
        lastOffset = offset + size;
        callbackProgress(result);
        if (offset + size >= file.size) {
            lastOffset = 0;
            callbackFinal();
        }
    }

    // in order
    console.log("[",reader.size,"]",reader.offset,'->', reader.offset+reader.size,"");
    parseResult(reader.offset, reader.size, reader.result);

    //resolve previous buffered
    var buffered = [{}]
    while (buffered.length > 0) {
        buffered = previous.filter(function (item) {
            return item.offset === lastOffset;
        });
        buffered.forEach(function (item) {
            console.log("[", item.size, "]", item.offset, '->', item.offset + item.size, "<<buffer");
            parseResult(item.offset, item.size, item.result);
            previous.remove(item);
        })
    }

}

Array.prototype.remove = Array.prototype.remove || function(val){
    var i = this.length;
    while(i--){
        if (this[i] === val){
            this.splice(i,1);
        }
    }
};

// Human file size
function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}
