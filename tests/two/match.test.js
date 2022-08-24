import test from 'tape'
import nlp from './_lib.js'
const here = '[two/match] '

let arr = [
  ['toronto', '#City'],
  ['mexico', '#Country'],
  ['Jamaica', '#Country'],
  ['august', '#Month'],
  ['saturday', '#WeekDay'],
  ['really', '#Adverb'],
  ['each', '#Determiner'],
  ['voila', '#Expression'],
  ['new england', '#Place'],
  ['hers', '#Possessive'],
  ['onto', '#Preposition'],
  ['blvd', '#Place'],
  ['belgian', '#Demonym'],
  ['cactus', '#Singular'],
  ['cacti', '#Plural'],
  ['economy', '#Noun'],
  ['brotherhood', '#Noun'],
  ['claire', '#FemaleName'],
  ['arthur', '#MaleName'],
  ['wrote', '#PastTense'],
  ['write', '#Verb'],
  ['survive', '#Verb'],
  ['our attempt', 'our #Noun'],
  ['can attempt', 'can #Verb'],
  ["mc'adams", '#LastName'],
  ['Müller', '#LastName'],
  ['muller', '#LastName'],
  ['invest', '#Verb'],
  ['investing', '#Verb'],
  [`wallys'`, '#Possessive'],
  ['zero in', '#Verb #Particle'],
  ['glacier', '#Singular'],
  ['glaciers', '#Plural'],
  ['withers', '#PresentTense'],
  ['wither', '#Infinitive'],
  ['german', '#Demonym'],
  ['germans', '#Demonym'],
  ['germans', '#Plural'],
  ['cres', '#Abbreviation'],
  ['nucleus', '#Singular'],
  ['nuclei', '#Plural'],
  ['sting', '#Infinitive'],
  ['stung', '#PastTense'],
  ['ocean', '#Noun'],
  ['shiver all night', '#Verb all #Noun'],
  [`flanders'`, '#Possessive'],
  ['MMMCMXXIII', '#RomanNumeral'],
  // ['MIMMCMXXIII', '#Acronym'], //invalid roman numeral
  ['c.e.o', '#Acronym'],
  ['MDMA', '#Acronym'],
  ['unless', '#Condition'],
  ['funniest', '#Superlative'],
  ['sillier', '#Comparative'],
  ['the', '#Determiner'],
  ['iraqi', '#Demonym'],
  ['december', '#Date'],
  ['suddenly', '#Adverb'],
  ['shanghai', '#City'],

  ['He is in Canada', '#Pronoun #Copula #Preposition #Place'],
  ['walk the walk', '#Verb #Determiner #Noun'],
  ['Peter the man', '#Person #Determiner #Noun'],
  ['butterfly', '#Singular'],
  ['he blamed the girl', '#Pronoun #PastTense #Determiner #Singular'],
  ['his fine', '#Possessive #Noun'],
  ['city/town', '#Noun'],
  ['city/town', 'city'],
  ['city/town', 'town'],
  ['his fines', '#Possessive #Noun'],
  ['asdfefs', '#Noun'],
  ['octopus', '#Noun'],
  ['tree', '#Noun'],
  ['i', '#Noun'],

  //slang, contractions
  ['u r nice', '#Pronoun #Copula #Adjective'],
  ['canadian bacon', '#Demonym #Noun'],
  ['canadian dollar', '#Currency #Currency'],

  //possessive rules
  ["john lkjsdf's", '#Person #Possessive'],
  ["john lkjsdf's house", '#Person #Possessive #Noun'],
  ["john Lkjsdf's house", '#Person #Possessive #Noun'],
  ["john Lkjsdf's House", '#Person #Possessive #Noun'],
  ["mark's question mark", '#Possessive #Noun #Noun'],

  //question-words
  ['who is good?', '#QuestionWord #Copula #Adjective'],
  ['which is good?', '#QuestionWord #Copula #Adjective'],
  // ['bacon which is good', '#Noun #Pronoun #Copula #Adjective'],
  // ['bacon which really is good', '#Noun #Pronoun #Adverb #Copula #Adjective'],
  // ['Douglas who really is good', '#Person #Pronoun #Adverb #Copula #Adjective'],

  ['at some point', '#Preposition #Determiner #Noun'],
  ['to a point', '#Conjunction #Determiner #Noun'],
  ['well, no.', '#Expression #Expression'],

  // infinitive-noun
  [`a tv show`, '#Determiner #Noun #Noun'],
  [`send me a currency report.`, '#Infinitive #Pronoun #Determiner #Noun #Noun'],
  // [`a close watch on`, '#Determiner #Adjective #Noun #Preposition'],
  [`a surgery date of`, '#Determiner #Noun #Noun #Preposition'],
  [`A girl hit a boy.`, '#Determiner #Noun #Infinitive #Determiner #Noun'],
  [`a auto repair shop.`, '#Determiner #Noun #Noun #Noun'],

  // timezones
  ['Morocco Standard Time', '#Timezone #Timezone #Timezone'],
  ['GMT+9', '#Timezone'],
  ['3pm EST', '#Time #Timezone'],
  ['3pm eastern time', '#Time #Timezone #Timezone'],
  ['pacific standard time', '#Timezone #Timezone #Timezone'],
  ['korea daylight time', '#Timezone #Timezone #Timezone'],
  ['tuesday', '#Date'],
  ['february', '#Date'],
  ['february fifth', '#Date+'],
  ['tuesday march 5th', '#Date+'],
  // ['tuesday march 5th, 2015', '#Date+'],

  // hyphens
  ['cartoon-ish', '#Adjective'],
  ['over-joyous', '#Adjective'],
  ['walk-able', '#Adjective'],
  ['trans-national', '#Adjective'],
  ['re-create', '#Verb'],
  ['micro-computer', '#Noun'],

  // contractions
  // 't
  ["we ain't", 'we are not'],
  ["she ain't", 'she is not'],
  ["she really ain't", 'she really is not'],
  ["we really ain't", 'we really are not'],
  ["the hotels really ain't", 'the hotels really are not'],
  ["the boxer really ain't", 'the boxer really is not'],
  // 's
  [`spencer's buritto`, `spencer's buritto`],
  [`spencer's walked`, `spencer has walked`],
  [`spencer's nice`, `spencer is nice`],
  // 'd
  [`i'd really walked`, `i had really walked`],
  [`i'd really see`, `i would really see`],
  [`how'd she do`, `how did she do`],

  // punctuation
  ['truth, bravery', '@hasComma bravery'],
  ['spencer did.', 'spencer @hasPeriod'],
  ['spencer did!', 'spencer @hasExclamation'],
  ['spencer did?', 'spencer @hasQuestionMark'],
  ['spencer did...', 'spencer @hasEllipses'],
  ['no fair; i said', 'no @hasSemicolon i said'],
  ['tornado/hurricane', 'hurricane'],
  ['tornado/hurricane', 'tornado'],
  ['tornado/hurricane', '@hasSlash'],
  ['like a tornado/hurricane', 'like a @hasSlash'],
  ["he isn't going", 'he @hasContraction #Gerund'],
  ['FIFA', '@isAcronym'],
  ['spencer', '@isKnown'],

  // misc
  ['swore', '#PastTense'],
  ['tore', '#PastTense'],
  ['gore', '#Noun'],
  [`spencer's city/town & cabin`, 'spencer city and .'],
  ['city/town', 'town'],
  // ["There's holes everywhere", 'there are #Plural .'],
  ["There's an issue", 'there is #Determiner #Noun'],
  ['Let’s not forget', 'let us not #Verb'],
  ['the thing about love', '#Determiner #Noun about #Noun'],
  [`I don't get much [sleep]`, 'i do not #Infinitive much #Noun'],
  ['the cardio dance party', '#Determiner #Noun #Noun #Noun'],
  ['the mexican train hijacker', '#Determiner #Noun #Noun #Noun'],
  // ['the dining experience', '#Determiner #Noun #Noun #Noun'],
  ['the student loan default rate', '#Determiner #Noun #Noun #Noun #Noun'],
  ['the examples include Jonathan Swift', '#Determiner #Noun #Verb #Noun #Noun'],
  ['the feet kick him', '#Determiner #Noun #Verb #Noun'],
  ['the fast train', 'the #Adjective #Noun'],
  ['the faster train', 'the #Adjective #Noun'],
  ['the fastest train', 'the #Adjective #Noun'],
  ['buy the dress', '#Verb the #Noun'],
  ['security forces take', '#Noun #Noun #Verb'],
  ['they sing tribute', '#Pronoun #Verb #Noun'],
  ['they sing praises', '#Pronoun #Verb #Plural'],
  // ['they cast doubt', '#Pronoun #Verb #Noun'],
  // ['being close', '#Verb #Adjective'],
  ['take control', '#Verb #Noun'],
  ['seek progress', '#Verb #Noun'],
  ['are building dreams', '#Copula #Gerund #Plural'],
  ['my aching head', 'my #Adjective #Noun'],
  // ['Ignoring commute costs', '#Verb #Noun #Noun'],
  ['the World Trade Center', 'the #Noun #Noun #Noun'],
  // ['minimizing side reactions', '#Gerund #Noun #Noun'],
  ['would not give rise', '#Modal not #PhrasalVerb #Particle'],
  // ['it sounds like her ', 'it #Verb #Adverb her'],
  // ['side of fries ', '#Noun of #Plural'],
  ['bright side of life', '#Adjective #Noun of #Noun'],
  ['the way of love', 'the #Noun of #Noun'],
  ['daily side hustle', '#Adjective #Noun #Noun'],
  ['mask the pain', '#Verb the #Noun'],
  ['tony the tiger', '#Noun the #Noun'],

  // ['some brand of cleaner', '#Noun #Noun of #Noun'],
  // ['some sort of dog', '#Noun #Noun of #Noun'],
  ['a dog of some sort', 'a #Noun of #Adjective #Noun'],
  ['the dutch feel', '#Determiner #Noun #Noun'],
  ['the captains feel too', '#Determiner #Noun #Verb #Adverb'],
  ['the baby dump', '#Determiner #Noun #Noun'],
  ['the nurse march', '#Determiner #Noun #Noun'],
  ['date of birth', '#Noun of #Noun'],
  ['kiss of death', '#Noun of #Noun'],
  // [`drinks and food fuel shopping at new Saks`, '#Noun and #Noun #Noun #Noun at new #Noun'],
  // [`litigation costs`, '#Noun #Noun'],
  // [`the dog, whose skip was Frank`, 'the #Noun whose #Noun was #Person'],
  // [`on Microsoft operating systems,`, 'on #Noun #Noun #Noun'],
  // // [`a national security issue `, 'a #Noun #Noun #Noun'],
  // [`formal thought patterns `, '#Adjective #Noun #Plural'],
  // [`every parenting system`, 'every #Noun #Noun'],
  // [`with Scotland winning 49 matches `, 'with #Place #Gerund #Value #Plural'],
  // [`for some reason`, 'for some #Noun'],
  // [`dirty tricks`, '#Adjective #Plural'],
  // [`a press release`, '#Determiner #Noun #Noun'],
  // [`the same type of shouts`, '#Determiner same #Noun of #Plural'],
  // [`the same kind of shouts`, '#Determiner same #Noun of #Plural'],
  // [`they are essential to expand`, '#Noun #Verb #Adjective to expand'],
  // [`had a rocky release`, 'had #Determiner #Adjective #Noun'],
  // [`might get better aim`, '#Auxiliary #Verb #Comparative #Noun'],
  // [`i think tipping blows`, 'i #PresentTense #Gerund #Adjective'],
  ['dept of state', '#Noun of #Noun'],
  // [ `must-see show`,''],
  [`would look like`, '#Modal #Infinitive .'],
  [`zero in`, '#PhrasalVerb #PhrasalVerb'],
  [`it was time`, '#Noun #Copula #Noun'],
  [`I've said`, '#Pronoun have #PastTense'],
  [`I've read`, '#Pronoun have #PastTense'],
  [`provide record levels`, '#Infinitive . #Plural'],
  [`I will attach`, '#Pronoun #Verb #Verb'],
  [`Leo in 2005`, '#Noun in #Value'],
  [`June 14 Reception`, '#Date #Date #Noun'],
  [`They will mature`, '#Pronoun will #PresentTense'],
  [`putting his hand`, '#Verb #Possessive #Noun'],
  [`understand my answer`, '#Verb #Possessive #Noun'],
  [`child’s play`, '#Possessive #Noun'],
  [`he describes his brush with death`, 'he #Verb #Possessive #Noun with #Noun'],
  [`decide their fate`, '#Verb #Possessive #Noun'],
  [`take your time`, '#Verb #Possessive #Noun'],
  [`strengthen our trade relations`, '#Verb #Possessive #Noun #Plural'],
  [`i need your help`, 'i #Verb #Possessive #Noun'],
  [`have our unyielding support`, '#Verb #Possessive #Adjective #Noun'],
  // [`my dear`, '#Possessive #Noun'],
  [`My old position`, '#Possessive #Adjective #Noun'],
  [`john's whole world`, '#Possessive #Adjective #Noun'],
  [`your online profiles`, '#Possessive #Adjective #Noun'],
  [`their past mistakes`, '#Possessive #Adjective #Noun'],
  // [`Toronto's epic Instagram feed`, '#Possessive #Adjective #Noun #Noun'],
  [`in your foul shoes`, 'in #Possessive #Adjective #Noun'],
  [`MY DEAR WIFE`, '#Possessive #Adjective #Noun'],
  // [`your majesty shall`, '#Possessive #Noun #Verb'],
  [`my youthful mind`, '#Possessive #Adjective #Noun'],
  [`our full support`, '#Possessive #Adjective #Noun'],
  // [`the feminine`, `the #Noun`],
  [`the feminine form`, `the #Adjective #Noun`],
  [`health insurance reform is tricky`, `#Noun #Noun #Noun is #Adjective`],
  [`Toronto will be home to large party`, `#Noun #Verb be #Verb to #Adjective #Noun`],

  [`by number of seats.`, 'by #Noun of #Plural'],
  [`he taught debate`, 'he #Verb #Noun'],
  [`singers on stage`, '#Noun on #Noun'],
  [`in times of change, a symbol`, 'in times of #Noun a #Noun'],
  [`powerful known tornadoes.`, '#Adjective #Adjective #Plural'],
  [`beauty sleep`, '#Noun #Noun'],
  // [`the pillow floor seats`, 'the #Noun #Noun #Noun'],
  [`the mrt bus stop.`, 'the #Noun #Noun #Noun'],
  [`buck naked`, '#Adjective #Adjective'],
  [`without any recharge.`, 'without any #Noun'],
  [`(mis-fired).`, '#Verb'],
  // [`president-elect`, '#Noun'],
  // [`flower-like.`, '#Adjective'],
  [`The old Fairy's turn`, 'the #Adjective #Possessive #Noun'],
  [`more with spite than age`, 'more with #Noun than #Noun'],
  // [`another fool to roast`, 'another #Noun to #Verb'],
  [`even the humblest`, '#Adverb the #Superlative'],
  ["Steve talked to Johnson LLC", '#Person talked to #Organization #Organization'],
  ["GIC airlines", '#Organization #Organization'],
  [`charcoal chicken`, '#Noun #Noun'],

  // not roman numerals
  ['LI', '!#RomanNumeral'],
  ['DC', '!#RomanNumeral'],
  ['MD', '!#RomanNumeral'],
  ['DM', '!#RomanNumeral'],
  ['ML', '!#RomanNumeral'],

  // ambiguous 'her'
  [`I hit him hard`, '#Pronoun #Verb #Pronoun (#Adjective|#Adverb)'],
  [`I hit her hard.`, '#Pronoun #Verb #Pronoun (#Adjective|#Adverb)'],



  ['reagent', '#Noun'],
  ['ingredient', '#Noun'],
  ['convent', '#Noun'],
  ['incident', '#Noun'],
  ['rodent', '#Noun'],
  ['correspondent', '#Noun'],
  ['descendent', '#Noun'],
  ['incident', '#Noun'],
  ['macronutrient', '#Noun'],
  ['urgent', '#Adjective'],
  ['asian', '#Demonym'],
  ['belgian', '#Demonym'],
  ['albanian', '#Demonym'],
  ['rotarian', '#Noun'],
  [`m`, '#Noun'],
  [`mineralogy`, '#Noun'],
  [`microsome`, '#Noun'],
  [`postage`, '#Noun'],
  [`agent`, '#Noun'],
  [`alkaloid`, '#Noun'],
  [`hierarchy`, '#Noun'],
  [`anarchy`, '#Noun'],
  [`psychopathy`, '#Noun'],
  [`apathy`, '#Noun'],
  [`horseradish`, '#Noun'],

  ["expertise", '#Noun'],
  ["premise", '#Noun'],
  ["merchandise", '#Noun'],
  ["demise", '#Noun'],
  ["sunrise", '#Noun'],
  ["anise", '#Noun'],
  ["treatise", '#Noun'],
  ["oligopoly", '#Noun'],
  ["disassembly", '#Noun'],
  ["petal", '#Noun'],
  ["golfer", '#Noun'],
  ["wafer", '#Noun'],
  ["offer", '#Verb'],
  ["infer", '#Verb'],
  ["suffer", '#Verb'],
  ["jennifer", '#FemaleName'],

  ["hilary", '#FemaleName'],
  [`vocabulary`, '#Noun'],
  [`documentary`, '#Noun'],
  [`monetary`, '#Adjective'],
  [`solitary`, '#Adjective'],
  [`elementary`, '#Adjective'],
  [`hereditary`, '#Adjective'],
  [`military`, '#Noun'],
  [`salary`, '#Noun'],
  [`purifier`, '#Noun'],
  [`humidifier`, '#Noun'],
  [`photocopier`, '#Noun'],
  [`generalist`, '#Noun'],
  [`racist`, '#Adjective'],
  [`moist`, '#Adjective'],
  [`twist`, '#Verb'],
  [`persist`, '#Verb'],
  [`stylist`, '#Noun'],
  [`waist`, '#Noun'],
  [`gist`, '#Noun'],
  [`hobbyist`, '#Noun'],
  [`medalist`, '#Noun'],
  [`metabolite`, '#Noun'],
  [`website`, '#Noun'],
  [`polite`, '#Adjective'],
  [`exquisite`, '#Adjective'],
  [`opposite`, '#Adjective'],
  [`his spite`, 'his #Noun'],
  [`parasite`, '#Noun'],
  [`favorite`, '#Adjective'],
  [`write`, '#Verb'],
  [`chlorite`, '#Noun'],
  [`meteorite`, '#Noun'],
  [`topic`, '#Noun'],
  [`fabric`, '#Noun'],
  [`picnic`, '#Noun'],
  [`tunic`, '#Noun'],
  [`cryptic`, '#Adjective'],
  [`acoustic`, '#Adjective'],
  [`erotic`, '#Adjective'],

  ['accommodate', '#Verb'],
  ['birthdate', '#Noun'],
  ['candidate', '#Noun'],
  ['validate', '#Verb'],
  ['update', '#Verb'],
  ['devastate', '#Verb'],
  ['rotate', '#Verb'],
  ['superintendent', '#Noun'],
  ['rodent', '#Noun'],
  ['incident', '#Noun'],
  ['crescent', '#Noun'],
  ['fluorescent', '#Adjective'],
  ['satisfy', '#Verb'],
  ['bestow', '#Verb'],
  ['disinfect', '#Verb'],
  ['reflect', '#Verb'],
  ['respect', '#Verb'],
  ['detect', '#Verb'],
  ['correct', '#Adjective'],
  ['aspect', '#Noun'],
  ['minor defect', '#Adjective #Noun'],
  ['restrict', '#Verb'],
  ['depict', '#Verb'],
  ['misinterpret', '#Verb'],
  ['relaunch it', '#Verb it'],
  ['relaunched', '#PastTense'],
  ['denounce', '#Verb'],
  ['denounces', '#Verb'],
  ['denounced', '#Verb'],
  ['refocus', '#Verb'],
  ['reorder it', '#Verb it'],
  ['misinform', '#Verb'],
  ['reclaim', '#Verb'],
  ['restrike', '#Verb'],
  ['disembark', '#Verb'],
  ['debunking', '#Gerund'],
  ['debunks', '#PresentTense'],
  ['verdict', '#Noun'],
  ['product', '#Singular'],
  ['products', '#Plural'],
  ['district', '#Singular'],
  ['maze', '#Singular'],
  ['blaze it', '#Verb it'],
  ['districts', '#Plural'],
  ['quiet addict', '#Adjective #Singular'],
  ['addict them', '#Verb them'],
  ["rearrange", "#Verb"],
  ["prearrange", "#Verb"],
  ["decommission", "#Verb"],
  ["depreciable", "#Adjective"],
  ["soluble", "#Adjective"],
  ["viable", "#Adjective"],
  ["valuable", "#Adjective"],
  ["disproportionate", "#Adjective"],
  ["plentiful", "#Adjective"],
  ["unfamiliar", "#Adjective"],
  ["victory", "#Noun"],
  ["grandnephew", "#Noun"],
  ["autobiography", "#Noun"],
  ["microarray", "#Noun"],
  ["pro-business", "#Adjective"],
  // ["post-gun", "#Adjective"],

  // ["food and programs", "#Noun and #Noun"],
  ["writes and programs", "#PresentTense and #PresentTense"],
  [`revisit the unsteamed towels`, '#Infinitive the #Adjective #Plural'],

  ["macronutrient", "#Noun"],
  ["undue", "#Adjective"],
  ["he was semiskilled", "he was #Adjective"],
  ["antiwork", "#Noun"],
  ["antiaircraft", "#Noun"],
  ["kilos", "#Noun"],
  ["autolytic", "#Adjective"],
  ["introvert", "#Noun"],
  ["de-orients", "#Verb"],
  ["deduct", "#Verb"],
  ["conduct", "#Verb"],

  ["contradictory", "#Adjective"],
  ["factory", "#Noun"],
  ["satisfactory", "#Adjective"],
  ["trajectory", "#Noun"],
  ["victory", "#Noun"],

  ["merged", "#PastTense"],
  ["mentioned", "#PastTense"],
  ["aired", "#PastTense"],
  ["screeched", "#PastTense"],
  ["screeches", "#PresentTense"],
  ["intoxicates", "#PresentTense"],
  ["it intoxicated him", "it #PastTense him"],
  // 
  ["trying not", "#Gerund not"],
  ["not trying", "not #Adjective"],
  // ["wait and see", "#Infinitive and #Infinitive"],
  ["bride and groom", "#Noun and #Noun"],

  ["conditioner", "#Singular"],
  ["loner", "#Singular"],
  ["prisoner", "#Singular"],
  ["sooner", "#Comparative"],
  ["toner", "#Singular"],
  ["owner", "#Singular"],


  ["diner", "#Singular"],
  ["dinner", "#Singular"],
  ["finer", "#Comparative"],
  ["foreigner", "#Singular"],
  ["partner", "#Singular"],
  ["toner", "#Singular"],
  ["werner", "#Singular"],
  ["winner", "#Singular"],
  ["it is eager to forget", "it is #Adjective to #Verb"],
  ["it is direct to ciaro", "it is #Verb to #Noun"],


  ['corporate', '!#Verb'],
  ['lane', '#Noun'],
  ['coke', '#Noun'],
  ['hormone', '#Noun'],
  ['hardwork', '#Noun'],
  ['likewise', '!#Verb'],
  ['forth', '!#Verb'],
  ['misfortune', '#Noun'],
  ['outstanding', '#Adjective'],
  ['renowned', '#Adjective'],
  ['interstate', '#Noun'],
  ['whoever', '!#Verb'],
  ['whenever', '!#Verb'],

  ['suicide', '#Noun'],
  ['beside', '#Adjective'],
  ['peptide', '#Noun'],
  ['worldwide', '#Adjective'],
  ['dioxide', '#Noun'],
  ['decide', '#Verb'],
  ['bide', '#Verb'],
  ['slide', '#Verb'],
  ['guide', '#Verb'],
  ['reside', '#Verb'],
  ['his backside', 'his #Noun'],

  ['attic', '#Noun'],
  ['arithmetic', '#Noun'],
  ['static', '#Noun'],
  ['tic', '#Noun'],

  ['squish', '#Infinitive'],

  ['portal', '#Noun'],
  ['parish', '#Noun'],
  ['adjective', '#Noun'],
  ['attic', '#Noun'],
  ['borough', '#Noun'],
  ['cathedral', '#Noun'],
  ['constable', '#Noun'],
  ['fetish', '#Noun'],
  ['conservatory', '#Noun'],
  ['mineral', '#Noun'],
  ['caterpillar', '#Noun'],
  ['fanny', '#Noun'],
  ['arithmetic', '#Noun'],

  // person-titlecase
  ['Ollie Faroo', '#Person #Person'],
  ['Cliff Clavin', '#Person #Person'],
  ['Wade Slowagon', '#Person #Person'],
  ['Jan Thierson', '#Person #Person'],
  ['Gail Emerson', '#Person #Person'],
  ['Wade G. Slapgoop', '#Person #Acronym #Person'],
  ['june F Fobo', '#Person #Acronym #Person'],
  ['buck M. Fobo', '#Person #Acronym #Person'],
  ['crystal D. Fobo', '#Person #Acronym #Person'],
  ['West Sydney', '!#Person+'],
  ['Sydney Harbour', '!#Person+'],
  // ['June Holiday Sweeps', '!#Person+'],
  ['Cliff Climber Group', '!#Person+'],
  // ['Faith Reunion', '!#Person+'],

  [`here's`, 'here is'],
  [`there's`, 'there is'],
  [`she's`, 'she is'],
  [`it's`, 'it is'],
  [`he's`, 'he is'],
  [`that's`, 'that is'],
  [`here's`, 'here is'],
  [`there's`, 'there is'],
  [`your's`, '#Possessive'],
  [`who's`, 'who is'],
  [`what's`, 'what is'],
  [`where's`, 'where is'],
  [`why's the doc`, 'why is the doc'],
  [`when's he coming`, 'when is he .'],
  [`how's that`, 'how is that'],
  [`let's`, 'let us'],
  [`somebody else's`, '. #Possessive'],
  [`my name's john`, 'my name is .'],

  ['logic', '#Noun'],
  ["liver", '#Noun'],
  ["incentive", '#Noun'],
  ["vanish", '#Infinitive'],
  ["vanish", '#Infinitive'],

  ["a worn dress", '#Determiner #Adjective #Singular'],
  ["Anna's eating lunch", '#Possessive #Gerund #Singular'],
  ["Anna's eating was impressive", '#Possessive #Noun #Copula #Adjective'],
  ["Québec is in canada", "québec #Verb in #Country"],
  ["Québec is in canada", "quebec #Copula in canada"],

  [`the remaining claims fail`, '#Determiner #Adjective #Plural #PresentTense'],
  [`6 hurt in family dispute`, '#Value #Infinitive in #Singular #Singular'],


  ['not be until 1982 that', 'not #Verb until #Year that'],
  ['in his case 1500 cakes', 'in #Possessive #Singular !#Year #Plural'],
  ['July 13, 1996 - video', '#Date+ #Singular'],
  ['3 men from 1938 through the end of WWII', '#Cardinal #Plural from #Year through . #Singular of #Acronym'],
  ['back in 1996', 'back in #Year'],
  // ['the 1989 epic', 'the #Year #Singular'],
  ['the 1975 hit', 'the #Year #Singular'],
  ['back to 2000', 'back to #Year'],
  ['the 1923 Tokyo disaster', 'the #Year #ProperNoun+ #Singular'],
  // ['Dave Fleischer\'s 1939 version', '#Person+ #Year #Singular'],
  ['the films made in 1931 are this creaky', 'the #Plural #Verb in #Year #Copula this #Adjective'],
  ['at the 1999 Melbourne International Film Festival', 'at the #Year #ProperNoun+'],
  ['its 1993 TV remake', 'its #Year #Noun+'],
  // ['in 1999 - 2001 Ted had a crisis', 'in #Year+ #Person had a #Singular'],
  ['circa 1971', '. #Year'],
  ['Set in 1976 for no apparent reason', '#Verb in #Year for no #Adjective #Singular'],
  ['the post - 1985 Perry Mason movies', 'the post #Year #Person+ #Plural'],
  // ['the 1988 blockbuster movie', 'the #Year #Noun+'],
  ['with its 1950 beds', 'with #Possessive !#Year #Plural'],
  ['His death in 1994 went barely noticed', '#Possessive #Noun in #Year #Verb #Adverb noticed'],
  ['the films in 1972 and 1974 respectively', 'the #Plural in #Year and #Year .'],
  ['seen over 2000 studio-era sound films', '#Verb over !#Year #Noun+'],
  ['This 1925 film narrates the story', '#Determiner #Year #Noun #PresentTense the #Singular'],
  // ['my 1950 convertable', '#Possessive #Year #Singular'],

  ["always throwing stones at me", '#Adverb #Gerund #Plural at #Pronoun'],

  ["any need for a trial", 'any #Noun for a #Noun'],
  ["go kayaking in a tributary?.", '#Verb #Gerund in a #Noun'],
  ["any need for a trial.", 'any #Noun for a #Noun'],
  ["as a whole", 'as a #Noun'],
  ["he had fallen into a cold", '#Pronoun #Auxiliary #Verb into a #Noun'],
  ["taken from us in an instant", 'taken from #Pronoun in an #Noun'],
  ["the instant he walked", 'the #Noun #Pronoun #PastTense'],

  ["5 gb", '#Value #Unit'],
  ["5 kb", '#Value #Unit'],
  ["5 k", '#Value #Unit'],
  ["550 m", '#Value #Unit'],
  ["50m", '#Value #Unit'],
  ["50 miles", '#Value #Unit'],
  ["50 square miles", '#Value #Unit+'],
  ["50 miles per hour", '#Value #Unit+'],
  ["5gb", '#Value #Unit'],
  ["team gb", '#Noun !#Unit'],
  ["dr oz", '#Noun !#Unit'],
  ["wizard of oz", '#Noun of !#Unit'],
  ["downtown pa", '#Noun !#Unit'],
  ["1 ft wide", '#Cardinal #Unit wide'],
  ["1 ft. wide", '#Cardinal #Unit wide'],
  ["1-ft wide", '#Cardinal #Unit wide'],

  ["felt confused", '#PastTense #Adjective'],
  ["felt a bit confused", '#PastTense a #Noun #Adjective'],
  [`she'll come around`, '#Pronoun will #PhrasalVerb #Particle'],
  ['that\'s not swell', 'that is not #Adjective'],
  ["I was an expert", 'i was an #Noun'],
  ["definitely worth a rental.", '#Adverb #Verb a #Noun'],
  ["keeping the matter a secret", '#Gerund the #Noun a #Noun'],
  ["30/01/194", '!#Date'],
  ["peace, flowers and doves", '#Noun #Noun and #Noun'],
]
test('match:', function (t) {
  let res = []
  arr.forEach(function (a) {
    let [str, match] = a
    let doc = nlp(str).compute('tagRank')
    // doc.tagger().tagger()
    let tags = doc.json()[0].terms.map(term => term.tagRank[0])
    let msg = `'${(str + "' ").padEnd(20, ' ')}  - '${tags.join(', ')}'`
    let m = doc.match(match)

    if (m.text() !== doc.text()) {
      res.push(a[0])
    }
    t.equal(m.text(), doc.text(), here + msg)
  })
  // console.log(JSON.stringify(res, null, 2))
  t.end()
})
