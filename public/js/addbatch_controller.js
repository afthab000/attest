app.controller('addBatchCtrl', ['$scope', '$http', function ($scope, $http) {
    
     $http.get('./files/view').then(function(response){
         
        $scope.files =response.data.files;
    });
    
     $scope.pending = function(file) {
        return (file.parent.toLowerCase()==='saved_files')
    };
      
    $scope.addBatchRow = function(){
        $scope.files.push({
              parent: "Saved_Files"
            , batch: 1
            , client: 'ABC'
            , id: 1
            , name: 'Player 15'
            , recDate: '25/12/2016'
            , duedate: '25/12/2016'
            , notary: true
            , mha: true
            , mea: false
            , consulateType: "UAE Consulate(Delhi)"
            , completed: "50%"
            , status: "None"
            , remarks:"Under Process"
            , selected: false

        })
        var index = $scope.files.length-1;
        var newFile = $scope.files[index];
        $http.post('./files/add', {newFile : $scope.files[index]}).then(function(){
            
            $http.get('./files/view').then(function(response){
         
        $scope.files =response.data.files;
    });
        });
        console.log($scope.files);
    };

$scope.modifyArray = [];
$scope.viewArray = [];
    
			$scope.modify = function(item){
                var index = $scope.files.indexOf(item);
				$scope.modifyArray[index] = true;
				$scope.viewArray[index] = true;
			};


			$scope.update = function(item){
                //$http.post('/files', {})
                
                 
                var index = $scope.files.indexOf(item);
                
                $http.put('./files/update', {updateFile : $scope.files[index]}).then(function(){
                
                    $http.get('./files/view').then(function(response){
                       $scope.files =response.data.files;
                    });
                });
				$scope.modifyArray[index] = false;
				$scope.viewArray[index] = false;
			};
    

    
    


 
 $scope.removeRow = function (idx) {
     
            var removeFile = $scope.files[idx];
            
     
            $http.put('./files/remove', {removeFile : $scope.files[idx]}).then(function(){
            
            
        });
            $scope.files.splice(idx, 1);
            };

$scope.sendToSafa = function() {
    
    
    for (var i=0; i<$scope.files.length; i++){
        
        if($scope.files[i].selected)
            {
                $scope.files[i].selected = false;
                $scope.files[i].parent="Pending_Files" ;
                                
                $http.put('./files/update', {updateFile : $scope.files[i]}).then(function(){
                $http.get('./files/view').then(function(response){
                       $scope.files =response.data.files;
                    });
            
        });
            }
    }
    
    
    
};



		}]);


