/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/siphash/index.js":
/*!***************************************!*\
  !*** ./node_modules/siphash/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ./lib/siphash */ \"./node_modules/siphash/lib/siphash.js\");\n\n\n//# sourceURL=webpack:///./node_modules/siphash/index.js?");

/***/ }),

/***/ "./node_modules/siphash/lib/siphash.js":
/*!*********************************************!*\
  !*** ./node_modules/siphash/lib/siphash.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nvar SipHash = (function() {\n    \"use strict\";\n    function _add(a, b) {\n        var rl = a.l + b.l,\n            a2 = { h: a.h + b.h + (rl / 2 >>> 31) >>> 0,\n                   l: rl >>> 0 };\n        a.h = a2.h; a.l = a2.l;\n    }\n\n    function _xor(a, b) {\n        a.h ^= b.h; a.h >>>= 0;\n        a.l ^= b.l; a.l >>>= 0;\n    }\n\n    function _rotl(a, n) {\n        var a2 = {\n            h: a.h << n | a.l >>> (32 - n),\n            l: a.l << n | a.h >>> (32 - n)\n        };\n        a.h = a2.h; a.l = a2.l;\n    }\n\n    function _rotl32(a) {\n        var al = a.l;\n        a.l = a.h; a.h = al;\n    }\n\n    function _compress(v0, v1, v2, v3) {\n        _add(v0, v1);\n        _add(v2, v3);\n        _rotl(v1, 13);\n        _rotl(v3, 16);\n        _xor(v1, v0);\n        _xor(v3, v2);\n        _rotl32(v0);\n        _add(v2, v1);\n        _add(v0, v3);\n        _rotl(v1, 17);\n        _rotl(v3, 21);\n        _xor(v1, v2);\n        _xor(v3, v0);\n        _rotl32(v2);\n    }\n\n    function _get_int(a, offset) {\n        return a.charCodeAt(offset + 3) << 24 |\n               a.charCodeAt(offset + 2) << 16 |\n               a.charCodeAt(offset + 1) << 8 |\n               a.charCodeAt(offset);\n    }\n\n    function hash(key, m) {\n        var k0 = { h: key[1] >>> 0, l: key[0] >>> 0 },\n            k1 = { h: key[3] >>> 0, l: key[2] >>> 0 },\n            v0 = { h: k0.h, l: k0.l }, v2 = k0,\n            v1 = { h: k1.h, l: k1.l }, v3 = k1,\n            mi, mp = 0, ml = m.length, ml7 = ml - 7,\n            buf = new Uint8Array(new ArrayBuffer(8));\n\n        _xor(v0, { h: 0x736f6d65, l: 0x70736575 });\n        _xor(v1, { h: 0x646f7261, l: 0x6e646f6d });\n        _xor(v2, { h: 0x6c796765, l: 0x6e657261 });\n        _xor(v3, { h: 0x74656462, l: 0x79746573 });\n        while (mp < ml7) {\n            mi = { h: _get_int(m, mp + 4), l: _get_int(m, mp) };\n            _xor(v3, mi);\n            _compress(v0, v1, v2, v3);\n            _compress(v0, v1, v2, v3);\n            _xor(v0, mi);\n            mp += 8;\n        }\n        buf[7] = ml;\n        var ic = 0;\n        while (mp < ml) {\n            buf[ic++] = m.charCodeAt(mp++);\n        }\n        while (ic < 7) {\n            buf[ic++] = 0;\n        }\n        mi = { h: buf[7] << 24 | buf[6] << 16 | buf[5] << 8 | buf[4],\n               l: buf[3] << 24 | buf[2] << 16 | buf[1] << 8 | buf[0] };\n        _xor(v3, mi);\n        _compress(v0, v1, v2, v3);\n        _compress(v0, v1, v2, v3);\n        _xor(v0, mi);\n        _xor(v2, { h: 0, l: 0xff });\n        _compress(v0, v1, v2, v3);\n        _compress(v0, v1, v2, v3);\n        _compress(v0, v1, v2, v3);\n        _compress(v0, v1, v2, v3);\n\n        var h = v0;\n        _xor(h, v1);\n        _xor(h, v2);\n        _xor(h, v3);\n\n        return h;\n    }\n\n    function string16_to_key(a) {\n        return [_get_int(a, 0), _get_int(a, 4),\n                _get_int(a, 8), _get_int(a, 12)];\n    }\n\n    function hash_hex(key, m) {\n        var r = hash(key, m);\n        return (\"0000000\" + r.h.toString(16)).substr(-8) +\n               (\"0000000\" + r.l.toString(16)).substr(-8);\n    }\n\n    function hash_uint(key, m) {\n        var r = hash(key, m);\n        return (r.h & 0x1fffff) * 0x100000000 + r.l;\n    }\n\n    return {\n        string16_to_key: string16_to_key,\n        hash: hash,\n        hash_hex: hash_hex,\n        hash_uint: hash_uint\n    };\n})();\n\nvar module = module || { }, exports = module.exports = SipHash;\n\n\n//# sourceURL=webpack:///./node_modules/siphash/lib/siphash.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nApp = {\n    loading: false,\n    contracts: {},\n\n    load: async () => {\n      siphash = __webpack_require__(/*! siphash */ \"./node_modules/siphash/index.js\");\n      await App.loadWeb3()\n      await App.loadAccount()\n      await App.loadContract()\n      await App.render()\n  },\n\n  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8\n  loadWeb3: async () => {\n    if (typeof web3 !== 'undefined') {\n      App.web3Provider = web3.currentProvider\n      web3 = new Web3(web3.currentProvider)\n    } else {\n      window.alert(\"Please connect to Metamask.\")\n    }\n    // Modern dapp browsers...\n    if (window.ethereum) {\n      window.web3 = new Web3(ethereum)\n      try {\n        // Request account access if needed\n        await ethereum.enable()\n        // Acccounts now exposed\n        web3.eth.sendTransaction({/* ... */})\n      } catch (error) {\n        // User denied account access...\n      }\n    }\n    // Legacy dapp browsers...\n    else if (window.web3) {\n      App.web3Provider = web3.currentProvider\n      window.web3 = new Web3(web3.currentProvider)\n      // Acccounts always exposed\n      web3.eth.sendTransaction({/* ... */})\n    }\n    // Non-dapp browsers...\n    else {\n      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')\n    }\n  },\n\n  loadAccount: async () => {\n    // Set the current blockchain account\n    App.account = web3.eth.accounts[0]\n  },\n\n  loadContract: async () => {\n    // Create a JavaScript version of the smart contract\n    const thesisProject = await $.getJSON('ThesisProject.json')\n    App.contracts.ThesisProject = TruffleContract(thesisProject)\n    App.contracts.ThesisProject.setProvider(App.web3Provider)\n\n    // load the smart contract with deployed values from the blockchain\n    App.thesisProject = await App.contracts.ThesisProject.deployed()\n  },\n\n  render: async () => {\n    // Prevent double render\n    if (App.loading) {\n      return\n    }\n\n    // Update app loading state\n    App.setLoading(true)\n\n    // Render Account\n    $('#account').html(App.account)\n\n    // Render Chunks\n    await App.renderChunks()\n\n    // Update loading state\n    App.setLoading(false)\n  },\n\n  renderChunks: async () => {\n    // Load the total chunk count from the blockchain\n     const fCount = await App.thesisProject.fCount()\n  },\n\n  hashCompute: ()  => {\n    App.setLoading(true)\n\n    //parse file and compute hash\n    handleFiles()\n\n    //upload progress bar animation\n    uploadProgress()\n},\n\n  tagCompute: () => {\n    App.setLoading(true)\n    //compute hash if new_hash has been conmputed\n    if (new_hash !== undefined) {\n      var key = (0|Math.random()*6.04e7).toString(36);\n      var new_tag = siphash.hash_hex(key, new_hash);\n\n      let upload_success = document.getElementById(\"upload-success\");\n      upload_success.append(new_tag)\n      upload_success.style.display = \"block\";\n\n      // Insert into blockchain\n      App.thesisProject.addChunk(new_tag,new_hash);\n\n    } else {\n      alert('Hold on if file is uploading... else upload a file first!')\n    }\n\n    // console.log(key)\n    // console.log(new_hash)\n    // console.log(new_tag)\n},\n\n  hashSearch: async () => {\n    App.setLoading(true)\n    const search_text = $('#tag_search').val();\n  // use search_text to query blockchain\n  try {\n    searched_hash = await App.thesisProject.fetchHash(search_text);\n\n    let tag_search = document.getElementById(\"hash-search\");\n    tag_search.append(searched_hash)\n    tag_search.style.display = \"block\";\n\n  } catch (err) {\n    alert(\"HASH UNAVAILABLE!!! Either File hasn't been uploaded or INTEGRITY broken!\")\n  }\n},\n\n  setLoading: (boolean) => {\n    App.loading = boolean\n    const loader = $('#loader')\n    const content = $('#content')\n    if (boolean) {\n      loader.show()\n      content.hide()\n    } else {\n      loader.hide()\n      content.show()\n    }\n  }\n}\n\n  $(() => {\n    $(window).load(() => {\n      App.load()\n    })\n})\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });