// svg decomressor

var SVGDecompresor = function(){

  var text_array,
    transform_string_array,
    transform_object_array = [],
    shape_string_array,
    shape_object_array = [];
    

  function decompress_big_ass_string(){
    var three_arrays = big_ass_string.split('|');
    shape_string_array = three_arrays[0].split('^');
    shape_string_array.shift();
    transform_string_array = three_arrays[1].split('^');
    transform_string_array.shift();
    text_array = three_arrays[2].split('^');
    text_array.shift();

    for (var i = 0; i < transform_string_array.length; i++){
      transform_object_array[i] = unpack_transform(transform_string_array[i]);
    }

    for (i = 0; i < shape_string_array.length; i++){
      if (shape_string_array[i][0] == 'g'){
        shape_object_array[i] = new Group();
      }else{
        shape_object_array[i] = new Shape(shape_string_array[i][0]);
      }
    }

    for (i = 0; i < shape_object_array.length; i++){
      if (shape_string_array[i][0] == 'g'){
        shape_object_array[i].update_transform_list(unpack_group(shape_string_array[i]));
      }else{
        shape_object_array[i].update_display_stats(unpack_shape(shape_string_array[i]));
      }
    }
    
    for (i = 0; i < shape_object_array.length; i++){
      // console.log( shape_object_array[i] );
      svg_graphics_array[i] = build_svg(shape_object_array[i]);
      // console.log( svg_graphics_array[i] );
    }
  };

  function build_svg(shape){
    return wrap_into_svg(shape.build_svg());
  };


  function wrap_into_svg(svg){
    return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 50 50" xml:space="preserve">'+svg+'</svg>';
  };

  function unpack_transform(transform){
    var stats_map = {
      x: 'x',
      y: 'y',
      r: 'rotation',
      s: 'scale',
      o: 'opacity',
      c: 'original_color',
      n: 'new_color'
    };
    var stats = {};
    for (var i = transform.length; i > -1 ; i--){
      if (stats_map.hasOwnProperty(transform[i])){
        stats[stats_map[transform[i]]] = transform.slice(i+1);
        transform = transform.substring(0, i);
      }
    }
    var t = new Transform(transform);
    t.update_transform_stats(stats);
    return t;
  };

  function unpack_shape(shape){
    var stats_map = {
      w: 'width',
      h: 'height',
      T: 'top',
      c: 'color',
      s: 'stroke',
      S: 'stroke_color',
      X: 'text',
      f: 'font_family',
      z: 'font_size'
    };
    var stats = {};
    for (var i = shape.length; i > -1 ; i--){
      if (stats_map.hasOwnProperty(shape[i])){
        stats[stats_map[shape[i]]] = shape.slice(i+1);        
        if (shape[i] == 'X'){
          stats.text = text_array[stats.text];
        }
        shape = shape.substring(0, i);
      }
    }
    return stats;
  };

  function unpack_group(group){
    var t = group.split(',');
    t.shift();
    for (var i = 0; i < t.length; i++){
      t[i] = transform_object_array[t[i]];
    }
    return t;
  }

  function get_shape(index){
    return shape_object_array[index];
  };


  this.decompress_big_ass_string = decompress_big_ass_string;
  this.get_shape = get_shape;
};

var svg_graphics_array = [];
var big_ass_string = '^rcF33h3w20^rcFFFh3w8^rcFFFh3w12^rcF33h3w8^rcFFFh8w20^g,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14^rcFB0h25w55^rcFB0h20w43^rcFB0h12w40^rcFB0h5w43^rcFB0h5w32^rc000h7w30^rc000h20w3^ecFFFh23w32^ecC33h10w10^g,15,16,17,18,19,20,21,22,23,24,25,26,27,28^ecC33h7w7^rc9CCh38w6^tcFFFh5w7T50^rc9CCh25w6^rcC69h2w8^g,29,30,31,32,33,34,35,36,37,38^g,29,39^ecFFFh10w10^ecC33h6w6^ec000h4w4^g,40,41,42^g,43,44,45,46,47^rc9CCh27w5^rcC33h4w5^rcC33h20w4^rc9CCh18w14^rcFFFh9w3^g,48,49,50,51^g,52,53,54,55,56^g,52,57,58,59,60^g,61,62,63,64,65^ec9CCh10w10^ecC33h5w5^g,66,67,68^rcFFFh4w2^g,69,70,71^g,69,72,73^g,48,74,75,76,77,78,79^rc9CCh38w3^rc0CCh3w15^rcFFFh3w15^rcC33h3w6^g,80,81,82,83^rcFFFh3w8^g,80,84,85,86^g,87,88^g,87,89^g,90,91,92^g,93,94,95^ec9CCh20w30^rc9CCh20w3^g,96,97^g,98,99,100,101,102,103,104,105,106,107,108,109,110^rc000h3w20^g,111,112,113,114^g,90,115,116,65^rc666h3w50^g,117,118,119,120,121,122^tcF93h50w100T50^rcF93h20w100^tcF93h10w30T50^rc9CCh8w5^g,123,124,125^rc666h50w40^g,126,127,128,129,130^rc000h5w40^tcFFFh70w100T50^tc6CCh20w20T50^tc6CCh60w50T50^g,131,132^rc111h100w100^ec667h10w10^ec667h5w5^ec677h2w2^g,133,134,135,136,137,138,139,140,141,142,143,144,145,146^ec677h1w1^g,147,148,149,150,151,152^tcFB0h20w30T50^g,153,154,155,156,157,158^g,159,160^g,153,161,162,163,164,165,166,167,168,169,170^rcFB0h10w30^g,15,18,19,171^g,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187^rcFB0h20w3^tcC33h40w40T50^g,188,189,190,191,192,193,194^tcFB0h10w10T44^g,172,195,196,197,198,199,200,201,202,203,204,205,206,207^g,147,208,209^g,210,211,212^g,210,213^g,210,214^g,215^g,216^ec3F3h10w10SFFFs1|^4x0y0^3x4y-5.5^1x0y-8.5^0x6y-11.8^1x-3y-15^1x-7y-18^0x-7y-21^3x3y5.5^1x0y8.5^0x6y11.7^1x-2y15^1x-6y18^0x-6y21^3x4y0^0x-6y0^6x0y0^7x0y22^8x1.7y38^9x0y-15^10x0y-20^13x25y25s0.5^14x20y25s0.5^11x1y30^12x-8y30^12x0y30^12x7y30^12x12y30^12x-4y30^12x3.3y30^17x0y0^16x0y-24^19x-14y0^20x-7y-6^20x-7y6^20x7y-6^20x7y6^19x14y0^18x14y-15^18x-14y-15^18x0y-21^23x0y0^24x-3y0^25x-4y0^26x0y0s0.5^26x0y11s0.5^26x0y22s0.5^26x0y33s0.5^26x0y44s0.5^31x0y0^32x0y-12^32x-3y12^32x3y12^30x0y0^30x4y-4^30x8y-8^28x12y-11.4^29x12y-25^30x-4y-4^30x-8y-8^28x-12.5y-12^29x-12.5y-27^33x0y0^34x9y-3^35x-9.3y-3^26x0y-26r90^18x0y0^37x0y0^38x0y0^40x0y-7^22x0y0^20x7y8^20x7y-8^20x-7y-7^20x-7y8^41x-18y0^42x18y0^39x-10y-2s1.2^21x30y19s0.4^29x-17.9y21^29x17.9y21^45x0y0^45x3y3^46x3y6^49x3y9^45x-3y3^46x-3y6^49x-3y9^47x0y0^47x2y1.5r90^47x-2y1.5r90^44x0y0^48x-12y-6^50x12y-6^53x0y0^51x-5y-20^52x5y-20^56x0y0^47x0y12r90c9CCnFFF^55x0y0^26x4y20s0.6^26x35y20r180s0.6^57x0y30^57x-15y24^57x15y24^60x0y10^36x25y10s0.5^54x35y37s0.3^43x60y25r90s0.5^43x-10y24r-90s0.5^27x24y37r90s0.2^27x55y37r90s0.2^59x0y0^18x-5y4r180^18x0y4r180^18x5y4r180^34x-16y12^35x16y14^62x0y-25^62x0y25^62x-23.5y0r90^62x23.5y0r90^62x0y0r45^62x0y0r-45^67x0y0^67x10y0^67x-10y0^69x0y0^68x0y0^68x0y-10^68x0y10^71x0y-23^74x0y20^73x0y-10^76x0y0^79x0y10^79x-22y-29^79x45y-40^79x-40y30^81x0y0^81x-20y-14^81x40y8^81x-45y-40^79x40y47^81x15y-30^81x-20y45^81x-30y12^81x22y30^65x0y40^64x0y20^66x-50y30^66x50y30^75x0y65s0.2^70x40y48s0.5^83x0y0^60x0y11^40x-3y0^40x3y0^18x0y-7^51x0y5^84x0y-20^84x0y16r-180^87x0y15^47x-5y21.4^47x5y21.4^16x0y10^25x0y10^32x8y0^32x-8y0^30x-17y10^30x17y10^81x0y-5^9x0y15^88x0y0^16x-8y0^16x8y0^25x8y0^25x-8y0^29x-10y19^29x0y19^29x10y19^90x15y27^90x-15y27^90x-5y27^90x5y27^40x0y0^46x0y-19^30x-24y0^30x24y0^91x0y0^23x0y8^24x0y6^25x0y6^93x15y25r180^93x-15.4y25.5r96^18x0y-10^84x0y-8^86x0y17^15x0y0s0.5^15x50y0s0.5^92x25y-7s0.5^86x-14y33r-90s0.5^86x64y33r90s0.5^89x10y-4s0.3^89x60y-4s0.3^18x-18y5^18x19y5^51x10y-10^51x-11y-10^66x-50y26^66x50y25^95x0y0^64x-20y25^72x70y70s0.2^73x0y25^64x0y30^82x0y0cF93nC76^98x0y0cF93nC76|';



