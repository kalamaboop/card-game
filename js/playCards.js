$(document).ready(function(){
    var cardDeck = $("#cardDeck").playingCards();
    cardDeck.spread(); // show it

    var hand = [];
    var computerHand = [];
    var discardPile = [];
    
    var showError = function(msg){
        $('#error').html(msg).show();
        setTimeout(function(){
            $('#error').fadeOut('slow');
        },3000);
    }
    var showHands = function(){
        var el = $('#yourHand')
        el.html('');
        for(var i=0;i<hand.length;i++){
            el.append(hand[i].getHTML());
        }
        
        el = $('#computerHand')
        el.html('');
        for(var i=0;i<computerHand.length;i++){
            el.append(computerHand[i].getHTML());
        }
        
        el = $('#discardPile')
        el.html('');
        for(var i=0;i<discardPile.length;i++){
            el.append(discardPile[i].getHTML());
        }
    }
    var doShuffle = function(){
        cardDeck.shuffle();
        cardDeck.spread(); // update card table
    }
    var doDrawCard1 = function(){
        var c = cardDeck.draw();
        if(!c){
            showError('No more cards');
            return;
        }
        hand[hand.length] = c;
        cardDeck.spread();
        showHands();
    };
    var doDrawCard2 = function(){
        var c = cardDeck.draw();
        if(!c){
            showError('No more cards');
            return;
        }
        computerHand[computerHand.length] = c;
        cardDeck.spread();
        showHands();
    };
    
    var doAddCard1 = function(){
        if(!hand.length){
            showError('Your hand is empty');
            return;
        }
        var c = hand.pop();
        showHands();
        discardPile[discardPile.length] = c;
        showHands();
    }
    
    var doAddCard2 = function(){
        if(!computerHand.length){
            showError('Computer hand is empty');
            return;
        }
        var c = computerHand.pop();
        showHands();
        discardPile[discardPile.length] = c;
        showHands();
    }
    
    var doDiscardToDeck = function(){
        if(!discardPile.length){
            showError('Discard Pile is empty');
            return;
        }
        var c = discardPile.pop();
        showHands();
        cardDeck.addCard(c);
        cardDeck.spread();
    }
    
    var doDeal = function(){
        
        var c;
        for(i = 0; i < 7; i++)
        {
            c = cardDeck.draw();
            if(!c){
                showError('No more cards');
                return;
            }
            hand[hand.length] = c;
            
            c = cardDeck.draw();
            if(!c){
                showError('No more cards');
                return;
            }
            computerHand[computerHand.length] = c;
            
            cardDeck.spread();
            showHands();
        }
    }

    var doOrderByRank = function(){
        cardDeck.orderByRank();
        cardDeck.spread(); // update card table
    }
    var doOrderBySuit = function(){
        cardDeck.orderBySuit();
        cardDeck.spread(); // update card table
    }
    
    var doDrawFromComp = function(){
        if(!computerHand.length){
            showError('Your hand is empty');
            return;
        }
        var c = computerHand.pop();
        showHands();
        hand[hand.length] = c;
        showHands();
    }
    
    
    $('#shuffler').click(doShuffle);
    $('#draw1').click(doDrawCard1);
    $('#draw2').click(doDrawCard2);
    $('#addCard1').click(doAddCard1);
    $('#addCard2').click(doAddCard2);
    $('#discardToDeck').click(doDiscardToDeck);
    $('#orderByRank').click(doOrderByRank);
    $('#orderBySuit').click(doOrderBySuit);
    $('#dealer').click(doDeal);
    $('#drawFromComp').click(doDrawFromComp);
    $('#drawFromHand').click(doDrawFromHand);
    

});
/*
// if we weren't using jquery to handle the document ready state, we would do this:
if (window.addEventListener) {
    window.addEventListener("load",initPlayingCards,false);
} else if (window.attachEvent) {
    window.attachEvent("onload",initPlayingCards);
} else {
    window.onload = function() {initPlayingCards();}
}
function initPlayingCards() {
    cardDeck = new playingCards();
}
*/
