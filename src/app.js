
App = {
    loading: false,
    contracts: {},

    load: async () => {
      siphash = require('siphash');
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const thesisProject = await $.getJSON('ThesisProject.json')
    App.contracts.ThesisProject = TruffleContract(thesisProject)
    App.contracts.ThesisProject.setProvider(App.web3Provider)

    // load the smart contract with deployed values from the blockchain
    App.thesisProject = await App.contracts.ThesisProject.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Chunks
    await App.renderChunks()

    // Update loading state
    App.setLoading(false)
  },

  renderChunks: async () => {
    // Load the total chunk count from the blockchain
     const fCount = await App.thesisProject.fCount()
  },

  hashCompute: ()  => {
    App.setLoading(true)

    //parse file and compute hash
    handleFiles()
},

  tagCompute: () => {
    App.setLoading(true)
    //compute hash if new_hash has been conmputed
    if (new_hash !== undefined) {
      var key = (0|Math.random()*6.04e7).toString(36);
      var new_tag = siphash.hash_hex(key, new_hash);

      let upload_success = document.getElementById("upload-success");
      upload_success.append(new_tag)
      upload_success.style.display = "block";

      // Insert into blockchain
      App.thesisProject.addChunk(new_tag,new_hash);

    } else {
      alert('Hold on if file is uploading... else upload a file first!')
    }

    // console.log(key)
    // console.log(new_hash)
    // console.log(new_tag)
},

  hashSearch: async () => {
    App.setLoading(true)
    const search_text = $('#tag_search').val();
  // use search_text to query blockchain
  try {
    searched_hash = await App.thesisProject.fetchHash(search_text);

    let tag_search = document.getElementById("hash-search");
    tag_search.append(searched_hash)
    tag_search.style.display = "block";

  } catch (err) {
    alert("HASH UNAVAILABLE!!! Either File hasn't been uploaded or INTEGRITY broken!")
  }
},

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
}

  $(() => {
    $(window).load(() => {
      App.load()
    })
})
