let transpose a =
  List.fold_right (List.map2 List.cons) a
    (List.init (List.length (List.hd a)) (fun _ -> []))

let rotate a = List.rev (transpose a);;

rotate [ [ 1; 2; 3; 4 ]; [ 5; 6; 7; 8 ]; [ 9; 10; 11; 12 ] ];;
rotate [ [] ]
