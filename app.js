'use strict';

let shajs = require('sha.js')
let _Vote = require('vote-api')

let contractAddress = "0xd89208fd82e9ae16789891654fa092cbf55eba2d"
let backupNodeURL = "https://128.199.140.92"
let signerURL = 'https://p07ckk3cb7.execute-api.us-east-1.amazonaws.com/dev/sign'
let wallet = {
  "public": "0xBA26Dcdfd63447baA042e3968a376cE70D530F83"
}

let _vote = new _Vote({
  providerURL: backupNodeURL,
  wallet: wallet,
  signerURL: signerURL
})

let loadPoll = _ => {
  console.log("load contract")
  return _vote.load(contractAddress)
  .then(_ => {
    return refresh()
  })
  .catch(error => {
    console.log(error)
  })
}

let createPoll = _ => {
  console.log("create new poll");
  return _vote.create("Who is the best?")
  .then(_ => {
    console.log("contract created", _vote.instance.address)
    // document.getElementById('address').innerText = instance.address;
  })
  .then(_ => {
    return _vote.addProposal("Nicolas")
  })
  .then(_ => {
    return _vote.addProposal("Thomas")
  })
  .then(_ => {
    return _vote.addProposal("Anthony")
  })
  .then(_ => {
    return _vote.addProposal("Manu")
  })
  .then(_ => {
    return refresh()
  })
  .catch(error => {
    console.log(error)
  })
}

let addProposal = proposal => {
  return _vote.addProposal(proposal)
  .then(_ => {
    return refresh()
  })
  .catch(error => {
    console.log(error)
  })
}

let numberOfVote = _ => {
  return _vote.numberOfVote
  .then(numberOfVote => {
    console.log(numberOfVote + " total votes");
    document.getElementById('numberOfVoteTotal').innerText = numberOfVote;
  })
  .catch(error => {
    console.log(error)
  })
}

let question = _ => {
  return _vote.question
  .then(question => {
    console.log("the question is: " + question);
    document.getElementById('question').innerText = question;
  })
  .catch(error => {
    console.log(error)
  })
}

let allProposals = _ => {
  return _vote.allProposals
  .then(function(allProposals) {
    console.log("allProposals", allProposals);
    let proposalsResult = "";
    let proposalsButtons = "";
    let i = 0
    allProposals.forEach(proposal => {
      proposalsResult += "<li class=\"list-group-item\"><span class=\"badge\">"+proposal.numberOfVote+"</span>"+proposal.name+"</li>";
      proposalsButtons += " <button onclick=\"App.vote("+i+")\" class=\"btn btn-primary\">Vote for "+proposal.name+"</button>";
      i++
    })
    document.getElementById('proposalsResult').innerHTML = proposalsResult;
    document.getElementById('proposalsButtons').innerHTML = proposalsButtons;
  })
  .catch(error => {
    console.log(error)
  })
}

let allVoters = _ => {
  return _vote.allVoters
  .then(function(allVoters) {
    console.log("allVoters", allVoters)
    let html = "<tr><th>Hash</th><th>Vote for</th></tr>"
    allVoters.forEach(voter => {
      html += "<tr><td>"+voter.voterHash+"</td><td>"+voter.proposalVoted+"</td></tr>"
    })
    document.getElementById('voters').innerHTML = html
  })
  .catch(error => {
    console.log(error)
  })
}

let refresh = _ => {
  console.log("refresh");
  return Promise.all([
    numberOfVote(),
    question(),
    allProposals(),
    allVoters()
  ])
  .then(_ => {
    console.log("refresh finished");
  })
  .catch(error => {
    console.log(error)
  })
}

let voteByLocal = (voterHash, proposal) => {
  console.log("vote for proposal " + proposal);
  document.getElementById('loading').className = "show";
  return _vote.vote(voterHash, proposal)
  .then(tx => {
    document.getElementById('loading').className = "hidden"
    console.log("voted for " + proposal)
    return refresh()
  })
  .catch(error => {
    document.getElementById('loading').className = "hidden"
    console.log(error)
  })
}

let vote = proposal => {
  //get voteName
  let voterName = document.getElementById('voterName').value
  if (voterName.length == 0) {
    return window.alert("Voter name empty")
  }
  let voterHash = "0x" + shajs('sha256').update(voterName, 'utf8').digest('hex') //@todo: improve
  document.getElementById('voterHash').innerHTML = voterHash
  // return voteByServer(voterHash, proposal)
  return voteByLocal(voterHash, proposal)
  .catch(error => {
    document.getElementById('loading').className = "hidden"
    console.log(error)
  })
}

module.exports.loadPoll = loadPoll
module.exports.createPoll = createPoll
module.exports.numberOfVote = numberOfVote
module.exports.question = question
module.exports.allProposals = allProposals
module.exports.allVoters = allVoters
module.exports.refresh = refresh
module.exports.vote = vote
module.exports.addProposal = addProposal
