const MAX_SIZE = 1000001;

// isprime[]: isprime[i] is true if number is prime
// prime[]: stores all prime numbers less than N
// SPF[] that store smallest prime factor of number----用于存储一个数小于它自身的所有prime factor
// [for Exp: smallest prime factor of '8' and '16'
// is '2' so we put SPF[8] = 2, SPF[16] = 2]
let isprime = Array(MAX_SIZE).fill(true);
let prime = [];
let SPF = Array(MAX_SIZE).fill(0);


// Function generate all prime numbers less than N in O(n)
function manipulated_seive(N) {
    // 0 and 1 are not prime------首先排除0和1
    isprime[0] = isprime[1] = false;

    // Fill rest of the entries
    for (let i = 2; i < N; i++) {
        // If isprime[i] is true then i is prime number---初始值都是true
        //这个i就是123一直到N的整数
        if (isprime[i]) {
            // put i into prime[] list
            prime.push(i);//但是这个数不一定是prime factor啊，没关系，我们继续往后看。

            // A prime number is its own smallest prime factor
            SPF[i] = i;
        }

        // Remove all multiples of i*prime[j] which are ----i*prime[j]得出的数都不是prime
        // not prime by making isprime[i*prime[j]] = false -----通过isprime[i*prime[j]] 为 false移除
        // and put the smallest prime factor of i*Prime[j] as ----并且将i*Prime[j] 设置为 prime[j]
        // prime[j] [for example: let i = 5, j = 0, prime[j]
        // = 2 [i*prime[j] = 10] so the smallest prime factor
        // of '10' is '2' that is prime[j]] this loop runs
        // only one time for numbers which are not prime
        let j = 0;
        //i*prime[j] < N 说明超出了我们要找质数的范围，虽然它依旧不是质数，但我们就没比要处理它了，也就是不需要标注为false。
        //prime[j] <= SPF[i]则说明
        while (j < prime.length && i * prime[j] < N && prime[j] <= SPF[i]) {//这里不是处理不是质数的因子，而是在为下一次for循环做准备
            //一个数是质数，那么它的倍数就一定不是质数了，所以我们在isprime中将不是质数的数通过数组的下标将其标注出来。
            isprime[i * prime[j]] = false;

            //由于prime[j]中的j每次for循环都是从0开始所以第一次prime[j]一定是2，这个j是会随着while循环增加的
            //而每次走到这个while时i却是不会变动的，这里当我们第一次进入这个循环的时候,我们将prime[j]这个数的所有的倍数下标代表的数字的最小质数设置为2
            //后面都是这个套路
            //SPF数组存储的是一个数的最小质数，但是某些数是没有最小质数的，你比如说3，3是质数
            //但是3却没有最小质数
            // put the smallest prime factor of i*prime[j]
            SPF[i * prime[j]] = prime[j];

            j++;
        }
    }
}

// Driver program to test above function
const N = 13; // Must be less than MAX_SIZE

manipulated_seive(N);

// Print all prime numbers less than N
console.log(prime.join(' '));
console.log(SPF[8]);