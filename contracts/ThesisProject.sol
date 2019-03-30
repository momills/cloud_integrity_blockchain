pragma solidity >=0.4.22 <0.6.0;
contract ThesisProject {

    uint public fCount = 0;

    Chunk[] internal file;
    struct Chunk {
        string _tag;
        string _hash;
    }

    constructor () public {
      addChunk("1","1313");
    }

    function Counter() internal {
        fCount += 1;
    }

    //function for comparing string: a subfunction of fetchHash(tag,hash)
    function equalStringInternal(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }

    //function for adding tag,hash to the blockchain
    function addChunkInternal(string memory _tag, string memory _hash) internal {
      file.push(Chunk(_tag, _hash));
                Counter();
    }

    //function for fetching the corresponding hash for integrity checking
    function fetchHash(string memory _tag) public view returns(string memory) {
        for(uint i=0; i<=fCount; i++)
            if(equalStringInternal(file[i]._tag, _tag ))
                return(file[i]._hash);
     }

     //PUBLIC addChunk
    function addChunk(string memory _tag, string memory _hash) public {
      addChunkInternal( _tag, _hash);
    }


}
