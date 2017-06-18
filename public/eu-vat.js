"use strict";

(function( $ ) {
    $.validate = function( field ) {
        return $.isNumeric( field.val() );
    };
    $(function() {
       $( "#eu-vat-form" ).on( "submit", function( e ) {
          e.preventDefault();
       });
       $( "#add-vat" ).on( "click", function() {
           $( "#results" ).hide().removeClass();

           var $field = $( "#amount" );
           var valid = $.validate( $field );
           if( !valid ) {
               $( "#results" ).text( "Valid number required" ).addClass( "text-danger" ).show();
           } else {
              $.post( "/calculate", {
                action: "add",
                amount: $( "#amount" ).val(),
                value: $( "#country" ).val()
              }, function( response ) {
                  $( "#results" ).text( response.vat.toFixed( 2 ) ).addClass( "text-success" ).show();
              });
           }
       });
       $( "#remove-vat" ).on( "click", function() {
           $( "#results" ).hide().removeClass();

           var $field = $( "#amount" );
           var valid = $.validate( $field );
           if( !valid ) {
             $( "#results" ).text( "Valid number required" ).addClass( "text-danger" ).show();
           } else {
              $.post( "/calculate", {
                action: "remove",
                amount: $( "#amount" ).val(),
                value: $( "#country" ).val()
              }, function( response ) {
                  $( "#results" ).text( response.vat.toFixed( 2 ) ).addClass( "text-success" ).show();
              });
           }
       });
       $( "#calc-vat" ).on( "click", function() {
           $( "#results" ).hide().removeClass();

           var $field = $( "#total" );
           var valid = $.validate( $field );
           if( !valid ) {
             $( "#results" ).text( "Valid number required" ).addClass( "text-danger" ).show();
           } else {
              $.post( "/calculate", {
                action: "amount",
                amount: $( "#total" ).val(),
                value: $( "#country" ).val()
              }, function( response ) {
                  $( "#results" ).text( response.vat.toFixed( 2 ) ).addClass( "text-success" ).show();
              });
           }
       });
    });
})( jQuery );
