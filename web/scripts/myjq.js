$(document).ready(function(){
    
    var arrayLength = titles.length;
    var titlesonly = new Array();
    var temp="";
    for (var i = 0; i < arrayLength; i++) {
        temp = titles[i].split("_");
        titlesonly[i] = temp[0];
    //Do something
    }   
        
    var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;
 
            // an array that will be populated with substring matches
            matches = [];
 
            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');
 
            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    // the typeahead jQuery plugin expects suggestions to a
                    // JavaScript object, refer to typeahead docs for more info
                    matches.push({
                        value: str
                    });
                }
            });
 
            cb(matches);
        };
    };
 
 
    var states = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        // `states` is an array of state names defined in "The Basics"
        local: $.map(titlesonly, function(state) {
            return {
                value: state
            };        
        })
    });
 
    // kicks off the loading/processing of `local` and `prefetch`
    states.initialize();
 
    $('#the-basics .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'titles',
        displayKey: 'value',
        source: substringMatcher(titlesonly)
    })
    .on('typeahead:selected', function($e, datum){
        $('#exactModal').modal('hide')
        $('#myModal').modal();
        myFunction(datum["value"]);
    });

 
    $('#bloodhound .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'states',
        displayKey: 'value',
        // `ttAdapter` wraps the suggestion engine in an adapter that
        // is compatible with the typeahead jQuery plugin
        source: states.ttAdapter()
    })
    .on('typeahead:selected', function($e, datum){
        $('#randomModal').modal('hide')
        $('#myModal').modal();
        myFunction(datum["value"]);
    })
    ;

    $('#stes').click(function() {
       
        $('#the-basics .typeahead').val('');
        $('#exactModal').modal();
    });
   
    $('#strs').click(function() {
        
        $('#bloodhound .typeahead').val('');
        
        $('#randomModal').modal();
        
    });
    
    
    function getFullBookName(bookcode) {
        var fullbookname;
        for ( var int2 = 0; int2 < legends.length; int2++) {
            if (bookcode == legends[int2]['Code']) {
                var fullformsplit = legends[int2]['Full Form'].split('-');
                if (fullformsplit[0] == 'Prem Ras Madira ') {
                    return fullformsplit[0];
                } else {
                    return legends[int2]['Full Form'];
                }
            }
        }
    }
	
	function getKirtanLink(selection) {
        var klink="#";
        for ( var int2 = 0; int2 < links.length; int2++) {
            if (selection == links[int2]['kirtan']) {
                klink=links[int2]['link'];
            }
        }
		return klink;
    }

    function getMadhuriName(bookcode) {
        var fullbookname;
        for ( var int2 = 0; int2 < legends.length; int2++) {
            if (bookcode == legends[int2]['Code']) {
                var fullformsplit = legends[int2]['Full Form'].split('-');
                if (fullformsplit[0] == 'Prem Ras Madira ') {
                    return fullformsplit[1];
                } else {
                    return null;
                }
            }
        }
    }

    function clear() {
        $("#englishtitle").html('');
        $("#book").html('');
        $("#madhuri").html('');
        $("#pagenumber").html('');
        $("#padnumber").html('');
        $("#sbook").html('');
        $("#spagenumber").html('');
        $("#spadnumber").html('');
    }

    function hideAll() {
        $("#kirtandetails").hide();
        $("#kirtandetailsmain").hide();
        $("#rowenglishtitle").hide();
        $("#rowbook").hide();
        $("#rowmadhuri").hide();
        $("#rowpagenumber").hide();
        $("#rowpadnumber").hide();
        $("#rowsbook").hide();
        $("#rowspagenumber").hide();
        $("#rowspadnumber").hide();
		$("#rowkirtanlink").hide();
    }
    
    
    function myFunction(selection) {
        clear();
        hideAll();
        
        
        var arrayLength = titlesonly.length;
        for (var i = 0; i < arrayLength; i++) {
            if(titlesonly[i] == selection)    {
                selection = titles[i];
            }
        }   
        
        var title_parts = selection.split("_");
			
        if(title_parts[0]){
            $("#kirtandetails").show();
            $("#kirtandetailsmain").show();
            $("#englishtitle").html(title_parts[0]);
            $("#rowenglishtitle").show();
        }
			
        if(title_parts[1]){
            var bookcode;
            var i;
            if (title_parts[1] == 'pr1' || title_parts[1] == 'pr2') {
                i = 2;
            } else {
                i = 1;
            }
            bookcode = title_parts[i++];

            $("#book").html(getFullBookName(bookcode));
            $("#rowbook").show();
        }

        if (getMadhuriName(bookcode)) {
            $("#madhuri").html(getMadhuriName(bookcode));
            $("#rowmadhuri").show();
        }
        if((title_parts[i])){
            $("#pagenumber").html(title_parts[i++]);
            $("#rowpagenumber").show();
        }
			
			
        if (title_parts[i]) {
            $("#padnumber").html(title_parts[i++]);
            $("#rowpadnumber").show();
        }

        if (title_parts[i]) {
            $("#sbook").html(getFullBookName(title_parts[i++]));
            $("#rowsbook").show();
        }

        if (title_parts[i]) {
            $("#spagenumber").html(title_parts[i++]);
            $("#rowspagenumber").show();
        }
        if (title_parts[i]) {
            $("#spadnumber").html('');
            $("#rowspadnumber").show();
        }
		
		var klink = getKirtanLink(selection);
		if(klink != "#") {
			$("#kirtanlink").attr("href",klink);
			$("#rowkirtanlink").show();
		}
		

    }
    
    $('#trigger').click(function(){
      $("#dialog").dialog();
    }); 
});