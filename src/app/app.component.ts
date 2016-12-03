import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  
  constructor() { }
  
  //Shows the three states of the observable
  example1() {
  	let foo = Observable.of(1,2,3,4,5,6,7,8,9);
  	let bar = foo.subscribe(
  		(res) => console.log(res),
  		(err) => console.log(err),
  		()=> console.log('Success'));
  }

  //How error is catched
  example2() {
  	let foo = new Observable<['number']>(
  		observer => {
  			setTimeout(()=> {
  				observer.next(1);
  			}, 1000);
  			setTimeout(()=> {
  				observer.next(2);
  			}, 1000);
  			setTimeout(()=> {
  				observer.error(new Error('Something went wrong'));
  			}, 3000);
  			setTimeout(()=> {
  				observer.complete();
  			}, 4000);
  		});

  	let bar = foo.subscribe(
  		(res) => console.log(res),
  		(err) => console.log(err),
  		()=> console.log('Success'));
  }

  //Ignoring Errors
  example3() {
  	let foo = Observable.onErrorResumeNext(
  		Observable.of(1),
  		Observable.throw(new Error()),
  		Observable.of(2),
  		Observable.throw(new Error()),
  		Observable.of(4),
  		Observable.throw(new Error()),
  		Observable.of(5)
  		);
  	let bar = foo.subscribe(
  		(res) => console.log(res),
  		(err) => console.log(err),
  		()=> console.log('Success'));
  }

  //Unsubscribe
  example4() {
  	let foo = new Observable<['number']>(
  		observer => {
  			setTimeout(()=> {
  				observer.next(1);
  			}, 1000);
  			setTimeout(()=> {
  				observer.next(2);
  			}, 1000);
  			setTimeout(()=> {
  				observer.error(new Error('Something went wrong'));
  			}, 3000);

  			setTimeout(()=> {
  				observer.complete();
  			}, 4000);
  		});

  	let bar = foo.subscribe(
  		(res) => console.log(res),
  		(err) => console.log(err),
  		()=> console.log('Success'));

  	bar.unsubscribe();
  	console.log(bar);
  }
  
  //Hot vs Cold
  example5() {
  	let foo = Observable.of(1,2,3,4,5,6,7,8,9);
  	
  	setTimeout(() => {
  		foo.subscribe(value => console.log(value));
	}, 0);

	setTimeout(() => {
	  foo.subscribe(value => console.log(`>>>> ${value}`));
	}, 2500);

  }

  //Functional Operator: Map
  example6() {
  	let foo = Observable.of(1,2,3,4,5,6,7,8,9,10)
	  	.map(x=> x*2);
  	let bar = foo.subscribe(
  		(res) => console.log(res),
  		(err) => console.log(err),
  		()=> console.log('Success'));
  }

  //Functional Operator: Reduce
  example7() {
  	let foo = Observable.of(1,2,3,4)
	  	.reduce((acc, x) => {
        	return acc * x;
    	},1);
  	let bar = foo.subscribe(
  		(res) => console.log(res),
  		(err) => console.log(err),
  		()=> console.log('Success'));
  }

  ngOnInit() {
  	//Run any example by changing the number in the function name
  	this.example5();
  }

}
