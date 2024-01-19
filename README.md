Hey, 

welcome to the rapid prototyping environment of our homework for the Senior Vue Developer position. 

The story of the exercise is the following: 

You inherited an `App.vue`  component from a junior developer. He managed to implement the basics of a cart application but he is stuck with some advanced features and unfortunately made a couple of mistakes as well. 
Please help him to implement the missing features, fix his bugs and explain to him your decisions in detail so that he can learn from them. 

The missing features are: 

- The "Market switch" on the top should switch between different markets in a reactive way. 
- Wire up the two APIs to get the latest exchange rates and VAT rates. (Docs: `https://exchangerate.host/#/#our-services`)
- Add the missing VAT calculations (standard rate) to calculate gross prices. (All the product prices are net and in EUR)
- Improve state management by adding Vuex 
- Optional: improve the responsiveness with tailwind (Docs: `https://tailwindcss.com/docs`)

If you think the architecture of the application could be better please do not hesitate to apply any patterns, principles, modern javascript features or vue best practices. You're allowed to migrate Vue to version 3 and introduce TypeScript.

Any addition that improves code quality or reduces the chance of bugs is welcome. 

The junior developer you are helping will review your work. He expects your explanations in form of (multiline) commits which you should make for every major change you use.
Example: 

` git commit -m 'Short summary' -m 'Detailed explanation..' `


To begin please install the dependencies and run the app:

`npm install`
`npm run serve` 

Once the solution is **production-ready** please run `npm run clean`, zip the whole `homework-vue` folder and send it to us. We will get back to you soon.

Happy Coding,
refurbed frontend apps team
