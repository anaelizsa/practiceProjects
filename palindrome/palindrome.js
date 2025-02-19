function isPalindrome(word){
    let word2 = word.toLowerCase()
    for (i = 0; i < Math.floor(word2.length/2); i++){
      if (word2[i] !== word2[word2.length - i - 1]){
        console.log(false);
        return;
      } 
    }
    console.log(true)
  }
  isPalindrome('racecar')
  isPalindrome('madam')
  isPalindrome('moonlight')
  isPalindrome('Ana')