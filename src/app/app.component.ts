import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'; 
import { Subject } from 'rxjs';


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

  //Subjects
  example6() {
  	let foo = new Subject();
  	let bar = foo.subscribe(
  		x=> console.log('next ' + x.toString()),
  		err => console.log('error ' + err),
  		()=> console.log('completed')
  		);

  	foo.next(1);
  	foo.next(2);
  	foo.next(3);
  	foo.complete();
  }

  //Functional Operator: Map
  example7() {
  	let foo = Observable.of(1,2,3,4,5,6,7,8,9,10)
	  	.map(x=> x*2);
  	let bar = foo.subscribe(
  		(res) => console.log(res),
  		(err) => console.log(err),
  		()=> console.log('Success'));
  }

  //Functional Operator: Reduce
  example8() {
  	let foo = Observable.of(1,2,3,4)
	  	.reduce((acc, x) => {
        	return acc * x;
    	},1);
  	let bar = foo.subscribe(
  		(res) => console.log(res),
  		(err) => console.log(err),
  		()=> console.log('Success'));
  }
  
  //Filter
  example9() {
  	let foo = Observable.of(1,2,3,4).filter((x)=> x % 2===0);
  	let bar = foo.subscribe(
  		(res) => console.log(res),
  		(err) => console.log(err),
  		()=> console.log('Success'));
  	}

  //Scan operator
  example10() {
  	let foo = Observable.interval(500).take(5);
  	let scanFoo = foo.scan((state, value) => state + value, 0);
    let bar = scanFoo.subscribe(total => console.log(total));
  }

  //Share
  example11() {
  	let foo = Observable.interval(500).take(5)
  		.do(i => console.log('foo value', + i))
  		.share();	
  	foo.subscribe(value => console.log("observer 1 received " + value));
	foo.subscribe(value => console.log("observer 2 received " + value));
  }
  ngOnInit() {
  	//Run any example by changing the number in the function name
  	this.example1();
  }

}
