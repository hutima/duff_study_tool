// Reader translation drills — short Greek -> English MCQs per chapter,
// plus literal translations for selected SBL verses already shown in
// the reader. Greek -> English only, since the course emphasises
// reading rather than active production.
//
// Difficulty levels:
//   1 = English-like word order, short sentence
//   2 = mild Greek reordering (verb-first, fronted phrase)
//   3 = Greek-style word order: object/genitive fronted, postpositives,
//       embedded modifiers, or a participle / subordinate clause
//
// Vocabulary in each sentence is restricted to words and grammar
// introduced through that chapter of Duff. Each sentence includes a
// short note explaining the construction or a common pitfall.

(function () {
  const READER_TRANSLATION_SETS = {
    2: {
      sentences: [
        {
          g: 'ὁ ἀδελφὸς ἀκούει.',
          level: 1,
          en: 'The brother hears.',
          choices: [
            'The brother hears.',
            'The brothers hear.',
            'The brother is heard.',
            'The brother speaks.'
          ],
          note: 'Subject (ὁ ἀδελφός, nom. sg.) + verb (3rd sg.). The verb supplies its own time reference (present).'
        },
        {
          g: 'ὁ θεὸς λέγει.',
          level: 1,
          en: 'God speaks.',
          choices: [
            'God speaks.',
            'God hears.',
            'The god is spoken.',
            'God is speaking [to them].'
          ],
          note: 'ὁ θεός — the article + nominative is normal even with proper-feeling nouns. λέγει is 3rd-sg. PAI.'
        },
        {
          g: 'ὁ δοῦλος λύει.',
          level: 1,
          en: 'The slave looses [it].',
          choices: [
            'The slave looses [it].',
            'The slave is loosed.',
            'The slaves loose [it].',
            'The slave fastens [it].'
          ],
          note: 'λύει = 3rd-sg. PAI. With no expressed object the English supplies "[it]". Compare middle/passive λύεται "is loosed", introduced later.'
        },
        {
          g: 'οὐ βλέπεις τὸν ἄγγελον.',
          level: 2,
          en: 'You do not see the angel.',
          choices: [
            'You do not see the angel.',
            'You see the angel.',
            'You hear the angel.',
            'I do not see the angel.'
          ],
          note: 'οὐ negates the indicative. βλέπεις is 2nd-sg. PAI ("you see"). The accusative τὸν ἄγγελον is the direct object.'
        },
        {
          g: 'γράφει ὁ ἄγγελος τὸν λόγον.',
          level: 2,
          en: 'The angel writes the word.',
          choices: [
            'The angel writes the word.',
            'The angel speaks the word.',
            'The word writes the angel.',
            'The angel reads the word.'
          ],
          note: 'Verb-first order (γράφει) is normal Greek. Case endings — not position — mark subject (-ος, nom.) and object (-ον, acc.).'
        },
        {
          g: 'πιστεύομεν τῷ λόγῳ.',
          level: 2,
          en: 'We believe the word.',
          choices: [
            'We believe the word.',
            'We say the word.',
            'You believe the word.',
            'They believe the word.'
          ],
          note: 'πιστεύω takes a dative complement: τῷ λόγῳ ("[to] the word") — translated as a direct object in English. -ομεν = 1st pl. PAI.'
        },
        {
          g: 'λύει τὸν δοῦλον ὁ Χριστὸς οὐχ ἁρπάζει.',
          level: 3,
          en: 'Christ looses the slave; he does not seize [him].',
          choices: [
            'Christ looses the slave; he does not seize [him].',
            'Christ does not loose the slave but seizes him.',
            'The slave looses Christ and does not seize him.',
            'Christ does not loose the slave; he seizes him.'
          ],
          note: 'οὐχ before rough breathing (the next word would have begun with rough h-). The same subject (ὁ Χριστός) covers both verbs.'
        },
        {
          g: 'τὸν λόγον τοῦ θεοῦ ἀκούουσιν οἱ ἄνθρωποι.',
          level: 3,
          en: 'The men hear the word of God.',
          choices: [
            'The men hear the word of God.',
            'God hears the words of men.',
            'The man hears the word of the gods.',
            'The men do not hear God\'s word.'
          ],
          note: 'Object phrase fronted (τὸν λόγον τοῦ θεοῦ); subject phrase (οἱ ἄνθρωποι, nom. pl.) and verb (3rd pl. PAI) come after. Movable nu on -ουσι(ν) appears here before the article.'
        },
        {
          g: 'οὐκ ἔχει ὁ δοῦλος ἄρτον, ὁ δὲ κύριος δίδωσιν.',
          level: 3,
          en: 'The slave does not have bread, but the master gives [him some].',
          choices: [
            'The slave does not have bread, but the master gives [him some].',
            'The slave has no bread and the master does not give.',
            'The master does not have bread, but the slave gives.',
            'The master gives bread to the slave\'s house.'
          ],
          note: 'οὐκ negates the verb. δέ is postpositive ("but / and"). Two parallel 3rd-sg. PAI verbs share the same scene.'
        }
      ]
    },

    3: {
      sentences: [
        {
          g: 'ὁ Ἰησοῦς ἀκούει τὴν φωνήν.',
          level: 1,
          en: 'Jesus hears the voice.',
          choices: [
            'Jesus hears the voice.',
            'The voice hears Jesus.',
            'Jesus speaks the voice.',
            'Jesus heard the voice.'
          ],
          note: 'Subject (ὁ Ἰησοῦς, nom.) + verb (3rd sg.) + object (τὴν φωνήν, acc.). Standard English-like order.'
        },
        {
          g: 'ὁ ἀδελφὸς γράφει τὸν λόγον.',
          level: 1,
          en: 'The brother writes the word.',
          choices: [
            'The brother writes the word.',
            'The brother speaks the word.',
            'The word writes the brother.',
            'The brothers write the word.'
          ],
          note: 'Plain SVO. Both nouns are 2nd-decl. masc. — distinguished by case ending (-ος nom., -ον acc.).'
        },
        {
          g: 'τὸ τέκνον ἔχει βιβλίον.',
          level: 1,
          en: 'The child has a book.',
          choices: [
            'The child has a book.',
            'The book has the child.',
            'The children have books.',
            'The child writes a book.'
          ],
          note: 'Neuter rule: τὸ τέκνον is nom. or acc. — context (subject of ἔχει) makes it nom. βιβλίον is anarthrous, hence indefinite "a book" in English.'
        },
        {
          g: 'βλέπει τὰ τέκνα ὁ ἄγγελος.',
          level: 2,
          en: 'The angel sees the children.',
          choices: [
            'The angel sees the children.',
            'The children see the angel.',
            'The angels see the child.',
            'The angel calls the children.'
          ],
          note: 'Greek often puts the verb first. The case endings tell you ὁ ἄγγελος (nom.) is the subject and τὰ τέκνα (neut. nom./acc.) is the object.'
        },
        {
          g: 'γινώσκει τὴν ὥραν ὁ κύριος.',
          level: 2,
          en: 'The Lord knows the hour.',
          choices: [
            'The Lord knows the hour.',
            'The hour knows the Lord.',
            'The Lord makes the hour.',
            'The hour is known to the Lord.'
          ],
          note: 'Verb-first; object (τὴν ὥραν, acc. fem.) before subject (ὁ κύριος, nom.). Greek lets emphasis drive order.'
        },
        {
          g: 'τὰ ἔργα τοῦ θεοῦ διδάσκουσιν τοὺς ἀνθρώπους.',
          level: 2,
          en: 'The works of God teach the people.',
          choices: [
            'The works of God teach the people.',
            'God teaches the works of the people.',
            'The people teach the works of God.',
            'The works of the people teach God.'
          ],
          note: 'Neuter plural subject (τὰ ἔργα) takes a 3rd-pl. verb here (the textbook quirk of singular-with-neuter-plural is a tendency, not a rule). Genitive τοῦ θεοῦ inside the subject phrase.'
        },
        {
          g: 'τοῦ προφήτου τὴν φωνὴν ἀκούει ὁ ὄχλος.',
          level: 3,
          en: 'The crowd hears the voice of the prophet.',
          choices: [
            'The crowd hears the voice of the prophet.',
            'The prophet hears the voice of the crowd.',
            'The voice of the crowd hears the prophet.',
            'The voice hears the prophet of the crowd.'
          ],
          note: 'Genitive (τοῦ προφήτου) is fronted before its head noun (τὴν φωνήν) for emphasis on the source. Verb in middle, subject (ὁ ὄχλος) at end.'
        },
        {
          g: 'τὸν λόγον τοῦ θεοῦ διδάσκει αὐτούς.',
          level: 3,
          en: 'He teaches them the word of God.',
          choices: [
            'He teaches them the word of God.',
            'They teach him the word of God.',
            'He learns the word of God from them.',
            'The word of God teaches him.'
          ],
          note: 'Object fronted (τὸν λόγον, acc.) with its genitive modifier (τοῦ θεοῦ); the verb (3rd sg.) supplies its own subject; αὐτούς is acc. pl. masc.'
        },
        {
          g: 'τὰ τέκνα τῶν ἀδελφῶν λέγει ὁ διδάσκαλος.',
          level: 3,
          en: 'The teacher addresses the children of the brothers.',
          choices: [
            'The teacher addresses the children of the brothers.',
            'The children of the teacher address the brothers.',
            'The brothers\' teacher speaks of the children.',
            'The children speak the words of the brothers and teachers.'
          ],
          note: 'Stacked genitive: τὰ τέκνα τῶν ἀδελφῶν ("the children of the brothers"). Object phrase fronted; verb + subject at end. λέγει + acc. of person = "speak to / address".'
        }
      ]
    },

    4: {
      sentences: [
        {
          g: 'ὁ Παῦλος λαλεῖ ἐν τῷ ἱερῷ.',
          level: 1,
          en: 'Paul speaks in the temple.',
          choices: [
            'Paul speaks in the temple.',
            'The temple speaks to Paul.',
            'Paul listens in the temple.',
            'Paul speaks to the temple.'
          ],
          note: 'ἐν + dative (τῷ ἱερῷ) marks location.'
        },
        {
          g: 'ὁ μαθητὴς ἔρχεται εἰς τὸν οἶκον.',
          level: 1,
          en: 'The disciple comes into the house.',
          choices: [
            'The disciple comes into the house.',
            'The disciple goes out from the house.',
            'The disciple is in the house.',
            'The disciple sees the house.'
          ],
          note: 'εἰς + accusative for motion into. Compare ἐν + dative (location) and ἐκ + genitive (motion out).'
        },
        {
          g: 'οἱ ἀδελφοὶ μένουσιν σὺν τῷ κυρίῳ.',
          level: 1,
          en: 'The brothers remain with the Lord.',
          choices: [
            'The brothers remain with the Lord.',
            'The brothers go away from the Lord.',
            'The brother remains with the Lord.',
            'The brothers come to the Lord.'
          ],
          note: 'σύν + dative ("with, in company with"). Distinguish from μετά + gen., which is also "with" — Duff treats σύν as more concrete association.'
        },
        {
          g: 'ἐκβάλλει τὰ δαιμόνια ἀπὸ τῶν ἀνθρώπων.',
          level: 2,
          en: 'He casts the demons out from the people.',
          choices: [
            'He casts the demons out from the people.',
            'The demons cast people out.',
            'He throws the people out from the demons.',
            'The demons throw people from him.'
          ],
          note: 'ἀπό + genitive = "away from"; the verb supplies the 3rd-sg. subject.'
        },
        {
          g: 'πέμπει ὁ θεὸς τὸν υἱὸν εἰς τὸν κόσμον.',
          level: 2,
          en: 'God sends the Son into the world.',
          choices: [
            'God sends the Son into the world.',
            'The Son sends God into the world.',
            'God sends the world out from the Son.',
            'God leads the Son out of the world.'
          ],
          note: 'Verb-first order. εἰς + acc. = "into". The case endings (not order) mark subject and object.'
        },
        {
          g: 'ἐκ τοῦ οὐρανοῦ ἔρχεται ὁ ἄρτος.',
          level: 2,
          en: 'The bread comes from heaven.',
          choices: [
            'The bread comes from heaven.',
            'Heaven comes from the bread.',
            'The bread comes into heaven.',
            'The bread goes through heaven.'
          ],
          note: 'ἐκ + gen. = "out of, from". Prepositional phrase fronted for emphasis on source.'
        },
        {
          g: 'διὰ τὸν Χριστὸν ὑπάγουσιν εἰς τὸν οἶκον τοῦ θεοῦ.',
          level: 3,
          en: 'Because of Christ they go into the house of God.',
          choices: [
            'Because of Christ they go into the house of God.',
            'Through the house of Christ they go to God.',
            'Because of Christ God goes into the house.',
            'Through Christ they go away from the house of God.'
          ],
          note: 'διά + accusative = "because of" (διά + genitive would be "through"); εἰς + accusative = "into".'
        },
        {
          g: 'πρὸ τῶν ἡμερῶν τούτων μένει ὁ προφήτης ἐν τῇ ἐρήμῳ.',
          level: 3,
          en: 'Before these days the prophet remains in the wilderness.',
          choices: [
            'Before these days the prophet remains in the wilderness.',
            'The prophet remains before these days in the wilderness.',
            'The prophet of these days is in the wilderness.',
            'After these days the prophet leaves the wilderness.'
          ],
          note: 'πρό + gen. = "before" (time or place). Two prepositional phrases bracket the main clause; verb comes between them.'
        },
        {
          g: 'μετὰ τῶν μαθητῶν ὁ Ἰησοῦς πορεύεται κατὰ τὴν ὁδόν.',
          level: 3,
          en: 'Jesus goes along the road with the disciples.',
          choices: [
            'Jesus goes along the road with the disciples.',
            'After the disciples Jesus goes down from the road.',
            'The disciples go with Jesus against the road.',
            'Jesus goes after his disciples on the road.'
          ],
          note: 'Two-case prepositions on display: μετά + gen. = "with"; κατά + acc. = "along, according to". Compare μετά + acc. = "after" and κατά + gen. = "down from / against".'
        }
      ]
    },

    5: {
      sentences: [
        {
          g: 'ἅγιος ὁ θεός.',
          level: 1,
          en: 'God is holy.',
          choices: [
            'God is holy.',
            'The holy God.',
            "God's holiness.",
            'God is the holy one.'
          ],
          note: 'Predicate position: ἅγιος has no article and the article-noun pair ὁ θεός has no adjective inside its bracket. εἰμί is implied.'
        },
        {
          g: 'ὁ νόμος καλός ἐστιν.',
          level: 1,
          en: 'The law is good.',
          choices: [
            'The law is good.',
            'The good law.',
            'A law is good.',
            'The law is good [men].'
          ],
          note: 'Predicate position with ἐστίν explicit. καλός has no article, so it predicates rather than modifies.'
        },
        {
          g: 'ὁ ἀγαπητὸς υἱὸς ἔρχεται.',
          level: 1,
          en: 'The beloved son comes.',
          choices: [
            'The beloved son comes.',
            'The son loves and comes.',
            'The son comes to the beloved.',
            'The beloved comes; the son [also].'
          ],
          note: 'Article–adjective–noun = first attributive position. ἀγαπητός sits inside the bracket and modifies υἱός.'
        },
        {
          g: 'ἡ ἀγαθὴ ἀδελφὴ διδάσκει τὰ τέκνα.',
          level: 2,
          en: 'The good sister teaches the children.',
          choices: [
            'The good sister teaches the children.',
            'The sister teaches the good children.',
            'The children teach the good sister.',
            'The good sister learns from the children.'
          ],
          note: 'Article–adjective–noun (ἡ ἀγαθὴ ἀδελφή) is the first attributive position; the adjective sits inside the article-noun bracket.'
        },
        {
          g: 'οἱ μαθηταὶ οἱ πιστοὶ μένουσιν.',
          level: 2,
          en: 'The faithful disciples remain.',
          choices: [
            'The faithful disciples remain.',
            'The disciples remain faithful.',
            'Faithful disciples remain.',
            'The disciples have remained faithful.'
          ],
          note: 'Second attributive position: article–noun–article–adjective (οἱ μαθηταί … οἱ πιστοί). Equivalent in meaning to first attributive.'
        },
        {
          g: 'τὸ ἔργον τοῦ θεοῦ καλόν.',
          level: 2,
          en: 'The work of God is good.',
          choices: [
            'The work of God is good.',
            'The good work of God.',
            'The work is the good of God.',
            'A good work belongs to God.'
          ],
          note: 'Predicate position again — καλόν has no article. εἰμί is implied. The genitive τοῦ θεοῦ sits inside the article-noun bracket.'
        },
        {
          g: 'πολλοὶ ἄνθρωποι ἀκούουσιν τοὺς λόγους τοῦ Ἰησοῦ ἐν τῇ συναγωγῇ.',
          level: 3,
          en: 'Many people hear the words of Jesus in the synagogue.',
          choices: [
            'Many people hear the words of Jesus in the synagogue.',
            'Many of the words of Jesus hear the people in the synagogue.',
            'Jesus hears many people in the synagogue.',
            'Jesus speaks many words in the synagogue.'
          ],
          note: 'πολλοί agrees with ἄνθρωποι (nom. pl.). Two different genitives — τοῦ Ἰησοῦ modifies τοὺς λόγους — and a locative ἐν-phrase.'
        },
        {
          g: 'τὸ καλὸν ποιεῖ ὁ ἀγαθός.',
          level: 3,
          en: 'The good [man] does the good [thing].',
          choices: [
            'The good [man] does the good [thing].',
            'The good [man] is good.',
            'The good [thing] makes the good [man].',
            'The good [man] is doing well.'
          ],
          note: 'Two substantival adjectives in one sentence: τὸ καλόν ("the good thing", neut.) and ὁ ἀγαθός ("the good man", masc.). Article + adjective alone.'
        },
        {
          g: 'ἀγαθοὶ οἱ λόγοι αὐτοῦ· πιστὸς γὰρ ὁ κύριος.',
          level: 3,
          en: 'His words are good, for the Lord is faithful.',
          choices: [
            'His words are good, for the Lord is faithful.',
            'His good words are faithful to the Lord.',
            'Good words make the Lord faithful.',
            'For his Lord, good and faithful are the words.'
          ],
          note: 'Two predicate-position clauses (ἀγαθοί … πιστός) separated by postpositive γάρ ("for"). εἰμί is implied in both.'
        }
      ]
    },

    6: {
      sentences: [
        {
          g: 'ἐκήρυξεν ὁ Παῦλος τὸ εὐαγγέλιον.',
          level: 1,
          en: 'Paul proclaimed the gospel.',
          choices: [
            'Paul proclaimed the gospel.',
            'Paul proclaims the gospel.',
            'Paul will proclaim the gospel.',
            'The gospel proclaimed Paul.'
          ],
          note: 'ἐ-κήρυξ-εν: augment ε- + 1st-aorist marker σα (κηρυκ + σα → κηρυξα) + 3rd-sg. secondary -ε(ν) = past completed action.'
        },
        {
          g: 'ἤκουσα τὴν φωνὴν τοῦ κυρίου.',
          level: 1,
          en: 'I heard the voice of the Lord.',
          choices: [
            'I heard the voice of the Lord.',
            'I hear the voice of the Lord.',
            'I will hear the voice of the Lord.',
            'You heard the voice of the Lord.'
          ],
          note: 'ἤκουσα: 1st-aor. act. 1st sg. of ἀκούω. Initial vowel α augmented to η (lengthening). σα marker still visible.'
        },
        {
          g: 'ἐλύσαμεν τοὺς δούλους.',
          level: 1,
          en: 'We loosed the slaves.',
          choices: [
            'We loosed the slaves.',
            'We loose the slaves.',
            'We will loose the slaves.',
            'You (pl.) loosed the slaves.'
          ],
          note: 'ἐ-λύ-σα-μεν: augment + stem + 1st-aor. σα + 1st-pl. secondary -μεν.'
        },
        {
          g: 'γράψει ὁ Παῦλος λόγους περὶ τοῦ νόμου.',
          level: 2,
          en: 'Paul will write words about the law.',
          choices: [
            'Paul will write words about the law.',
            'Paul writes words about the law.',
            'Paul wrote words about the law.',
            'The law writes about Paul’s words.'
          ],
          note: 'γράψει = γράφ-σ-ει (labial + σ → ψ); the σ before the primary ending marks the future. περί + gen. = "concerning".'
        },
        {
          g: 'πέμψω τοὺς μαθητὰς εἰς τὴν πόλιν.',
          level: 2,
          en: 'I will send the disciples into the city.',
          choices: [
            'I will send the disciples into the city.',
            'I send the disciples into the city.',
            'I sent the disciples into the city.',
            'The disciples will send me into the city.'
          ],
          note: 'πέμψω: future of πέμπω (labial π + σ → ψ). 1st-sg. primary ending -ω.'
        },
        {
          g: 'ἔβλεπον τοὺς μαθητὰς ἐν τῷ ἱερῷ.',
          level: 2,
          en: 'They were watching the disciples in the temple.',
          choices: [
            'They were watching the disciples in the temple.',
            'I was watching the disciples in the temple.',
            'They watched the disciples in the temple.',
            'I watched the disciples in the temple.'
          ],
          note: 'ἔβλεπον is ambiguous in form: 1st sg. or 3rd pl. imperfect of βλέπω. Context (lacking explicit ἐγώ) and parallel-clause logic typically pick 3rd-pl.'
        },
        {
          g: 'τότε ἐδιδάσκετε τοὺς ἀνθρώπους ἐν τῇ συναγωγῇ.',
          level: 3,
          en: 'Then you (pl.) were teaching the people in the synagogue.',
          choices: [
            'Then you (pl.) were teaching the people in the synagogue.',
            'Then you (pl.) taught the people in the synagogue.',
            'You (pl.) teach the people in the synagogue then.',
            'Then the people taught you in the synagogue.'
          ],
          note: 'ἐ-διδάσκ-ετε: augment ε- + present stem + secondary -ετε = imperfect (ongoing past). Aorist would be ἐδιδάξατε.'
        },
        {
          g: 'τὰ τέκνα τοῦ προφήτου ἤγαγον εἰς τὸν οἶκον τοῦ θεοῦ.',
          level: 3,
          en: 'They led the children of the prophet into the house of God.',
          choices: [
            'They led the children of the prophet into the house of God.',
            'The children led the prophet to God\'s house.',
            'The prophet led the children to God\'s house.',
            'The children of the prophet went to God\'s house.'
          ],
          note: 'ἤγαγον: 2nd aorist of ἄγω (note reduplication-like ἀγ→ηγαγ). Object phrase fronted; verb final on first half.'
        },
        {
          g: 'οὐκ ἐπίστευσαν τοῖς λόγοις, ἤγγισεν γὰρ ἡ ὥρα τοῦ κρίματος.',
          level: 3,
          en: 'They did not believe the words, for the hour of judgment had drawn near.',
          choices: [
            'They did not believe the words, for the hour of judgment had drawn near.',
            'They did not believe the words, but the hour drew near for judgment.',
            'The hour of judgment did not believe the words.',
            'The hour of judgment did not draw near; they did not believe.'
          ],
          note: 'Two aorists side by side. γάρ ("for") postpositive. πιστεύω governs the dative (τοῖς λόγοις).'
        }
      ]
    },

    7: {
      sentences: [
        {
          g: 'ὁ ἀπόστολος ἔλαβεν τὸ βιβλίον.',
          level: 1,
          en: 'The apostle took the book.',
          choices: [
            'The apostle took the book.',
            'The apostle takes the book.',
            'The book took the apostle.',
            'The apostle will take the book.'
          ],
          note: 'ἔλαβεν = 2nd aorist of λαμβάνω: augment ε- + aorist stem λαβ- + secondary -ε(ν), no σα marker.'
        },
        {
          g: 'θέλω ἀκούειν τὸν λόγον.',
          level: 1,
          en: 'I want to hear the word.',
          choices: [
            'I want to hear the word.',
            'I hear the word.',
            'I will hear the word.',
            'You want to hear the word.'
          ],
          note: 'θέλω + complementary infinitive (ἀκούειν, pres. act. inf.) = "I want to V".'
        },
        {
          g: 'ἔγραψα τὸν λόγον.',
          level: 1,
          en: 'I wrote the word.',
          choices: [
            'I wrote the word.',
            'I write the word.',
            'I will write the word.',
            'You wrote the word.'
          ],
          note: '1st-aor. 1st-sg. of γράφω: ἐ-γραψ-α. Compare imperfect ἔγραφον (different stem).'
        },
        {
          g: 'οὐκ ἔχομεν ἐξουσίαν ἐν τῷ ἱερῷ.',
          level: 2,
          en: 'We do not have authority in the temple.',
          choices: [
            'We do not have authority in the temple.',
            'We do not seek authority in the temple.',
            'We do have authority in the temple.',
            'You (pl.) do not have authority in the temple.'
          ],
          note: 'οὐκ negates the indicative (becomes οὐχ before rough breathing, οὐ before consonants).'
        },
        {
          g: 'οὐχ εὕρομεν τὸν Ἰησοῦν ἐν τῷ ἱερῷ.',
          level: 2,
          en: 'We did not find Jesus in the temple.',
          choices: [
            'We did not find Jesus in the temple.',
            'We did not seek Jesus in the temple.',
            'We found Jesus in the temple.',
            'You did not find Jesus in the temple.'
          ],
          note: 'οὐχ before rough breathing (εὕ-). εὕρομεν is 2nd-aor. (alternate stem εὑρ-) of εὑρίσκω.'
        },
        {
          g: 'εἶπον τοῖς μαθηταῖς λέγειν τὸν λόγον.',
          level: 2,
          en: 'They told the disciples to speak the word.',
          choices: [
            'They told the disciples to speak the word.',
            'The disciples spoke the word.',
            'They spoke to the disciples the word.',
            'They told the disciples to hear the word.'
          ],
          note: 'εἶπον = 2nd-aor. of λέγω (suppletive root). Verb of saying + complementary infinitive (λέγειν).'
        },
        {
          g: 'μέλλει ὁ θεὸς πέμπειν τοὺς ἀγγέλους εἰς τὸν κόσμον.',
          level: 3,
          en: 'God is about to send the angels into the world.',
          choices: [
            'God is about to send the angels into the world.',
            'God sends the angels of the world.',
            'God sent the angels into the world.',
            'The angels are about to send God into the world.'
          ],
          note: 'μέλλω + infinitive = "be about to do …". πέμπειν is the present active infinitive.'
        },
        {
          g: 'ἔχομεν ἐξουσίαν ἐκβάλλειν τὰ δαιμόνια ἐκ τῶν ἀνθρώπων.',
          level: 3,
          en: 'We have authority to cast out the demons from the people.',
          choices: [
            'We have authority to cast out the demons from the people.',
            'The demons have authority to cast us out from the people.',
            'We have authority over the people of the demons.',
            'We are authorized; the demons cast people out.'
          ],
          note: 'ἐξουσίαν + complementary infinitive ("authority to V"). Echoes Mk 3:15 (in this chapter\'s SBL set). ἐκ + gen. = "out of, from".'
        },
        {
          g: 'οὔπω ἤκουσαν οἱ ἄνθρωποι, ἀλλὰ ἤγαγον αὐτοὺς εἰς τὸν οἶκον.',
          level: 3,
          en: 'The people had not yet heard, but they led them into the house.',
          choices: [
            'The people had not yet heard, but they led them into the house.',
            'The people heard, but they did not lead them into the house.',
            'The people heard them and led them into the house.',
            'The people were leading them, but they had not yet heard.'
          ],
          note: 'οὔπω = "not yet". Two aorists in sequence; the 3rd-pl. -αν / -ον endings differ — both still secondary.'
        }
      ]
    },

    8: {
      sentences: [
        {
          g: 'ὁ μαθητὴς ἔρχεται πρὸς τὸν Ἰησοῦν.',
          level: 1,
          en: 'The disciple comes to Jesus.',
          choices: [
            'The disciple comes to Jesus.',
            'Jesus comes to the disciple.',
            'The disciple takes Jesus.',
            'The disciple was coming to Jesus.'
          ],
          note: 'ἔρχομαι is middle/deponent: middle endings, active meaning. πρός + acc. = "to / toward".'
        },
        {
          g: 'ἡ ἡμέρα τοῦ κυρίου ἐγγίζει.',
          level: 1,
          en: 'The day of the Lord draws near.',
          choices: [
            'The day of the Lord draws near.',
            'The day of the Lord is far off.',
            'The Lord\'s day departs.',
            'The Lord draws near to the day.'
          ],
          note: 'ἡμέρα is 1st-decl. fem. ἐγγίζει = 3rd-sg. PAI of ἐγγίζω ("draw near"). Genitive τοῦ κυρίου modifies ἡ ἡμέρα.'
        },
        {
          g: 'ὁ Ἰησοῦς ἀγαπᾷ τὸν ἀδελφόν.',
          level: 1,
          en: 'Jesus loves the brother.',
          choices: [
            'Jesus loves the brother.',
            'The brother loves Jesus.',
            'Jesus loved the brother.',
            'Jesus seeks the brother.'
          ],
          note: 'ἀγαπᾷ = ἀγαπά-ει contracted (α-contract). Iota subscript ᾷ is what survives of the -ει ending.'
        },
        {
          g: 'οἱ μαθηταὶ ἀκολουθοῦσιν τῷ Ἰησοῦ.',
          level: 2,
          en: 'The disciples follow Jesus.',
          choices: [
            'The disciples follow Jesus.',
            'Jesus follows the disciples.',
            'The disciples teach Jesus.',
            'The disciple follows Jesus.'
          ],
          note: 'ἀκολουθέω takes a dative complement: τῷ Ἰησοῦ = "[to / with] Jesus" — translated naturally as a direct object in English.'
        },
        {
          g: 'γίνεται φωνὴ ἐκ τοῦ οὐρανοῦ.',
          level: 2,
          en: 'A voice comes from heaven.',
          choices: [
            'A voice comes from heaven.',
            'A voice goes into heaven.',
            'Heaven becomes a voice.',
            'The voice from heaven is silent.'
          ],
          note: 'γίνεται: 3rd-sg. PMI of γίνομαι ("become / happen / come about") — middle/deponent. Verb-first; subject (φωνή, anarthrous = "a voice") follows.'
        },
        {
          g: 'ἐν τῷ ἱερῷ διδάσκει αὐτοὺς ὁ προφήτης.',
          level: 2,
          en: 'In the temple the prophet teaches them.',
          choices: [
            'In the temple the prophet teaches them.',
            'The prophet teaches them about the temple.',
            'The temple teaches the prophet of them.',
            'In the temple they teach the prophet.'
          ],
          note: 'Prepositional phrase fronted (ἐν τῷ ἱερῷ); verb + object + subject follow. αὐτούς is acc. pl. masc. ("them").'
        },
        {
          g: 'προσεύχεται ὁ Ἰησοῦς ἐν τῇ ἐρήμῳ.',
          level: 3,
          en: 'Jesus prays in the wilderness.',
          choices: [
            'Jesus prays in the wilderness.',
            'Jesus speaks in the wilderness.',
            'Jesus prayed in the wilderness.',
            'The wilderness prays to Jesus.'
          ],
          note: 'Verb-first order with a middle/deponent verb (προσεύχομαι); ἔρημος is feminine 2nd decl. (so ἐν τῇ ἐρήμῳ).'
        },
        {
          g: 'φοβοῦνται οἱ ἄνθρωποι· ἀπολύει γὰρ τοὺς ἁμαρτωλοὺς ὁ θεός.',
          level: 3,
          en: 'The people are afraid; for God releases the sinners.',
          choices: [
            'The people are afraid; for God releases the sinners.',
            'God releases the people, but the sinners are afraid.',
            'The sinners fear God\'s release of the people.',
            'The people fear God; he releases the sinners not.'
          ],
          note: 'φοβοῦνται: 3rd-pl. PMI of φοβέομαι (deponent). γάρ postpositive. Two clauses with parallel verb-first order.'
        },
        {
          g: 'ἀπέρχεται ὁ Ἰησοῦς εἰς τὰ ἴδια καὶ προσεύχεται μόνος.',
          level: 3,
          en: 'Jesus goes away to his own [place] and prays alone.',
          choices: [
            'Jesus goes away to his own [place] and prays alone.',
            'Jesus comes alone to his own [place] and prays.',
            'Jesus alone leaves his own [place] and prays.',
            'Jesus prays in his own [place] and is alone.'
          ],
          note: 'Two middle/deponents in series (ἀπέρχεται, προσεύχεται). τὰ ἴδια ("his own things") is a substantival adjective. μόνος agrees with the subject.'
        }
      ]
    },

    9: {
      sentences: [
        {
          g: 'ἐγώ εἰμι ὁ ἄρτος τῆς ζωῆς.',
          level: 1,
          en: 'I am the bread of life.',
          choices: [
            'I am the bread of life.',
            'The bread of life is for me.',
            'He is the bread of my life.',
            'I have the bread of life.'
          ],
          note: 'Iconic Johannine ἐγώ εἰμί construction. After εἰμί the predicate noun (ὁ ἄρτος) is nominative.'
        },
        {
          g: 'οὗτός ἐστιν ὁ διδάσκαλός μου.',
          level: 1,
          en: 'This [man] is my teacher.',
          choices: [
            'This [man] is my teacher.',
            'My teacher is this [man].',
            'This is the teacher\'s.',
            'I am the teacher of this man.'
          ],
          note: 'Demonstrative οὗτος (near). Possessive μου ("my", gen. of ἐγώ) attaches to the noun.'
        },
        {
          g: 'σὺ εἶ ὁ προφήτης.',
          level: 1,
          en: 'You are the prophet.',
          choices: [
            'You are the prophet.',
            'The prophet is you.',
            'You and the prophet.',
            'I am the prophet.'
          ],
          note: 'Explicit σύ for emphasis ("you, [you]"). εἶ = 2nd-sg. of εἰμί. Predicate ὁ προφήτης is nominative.'
        },
        {
          g: 'οὗτός ἐστιν ὁ υἱὸς τοῦ θεοῦ.',
          level: 2,
          en: 'This [man] is the Son of God.',
          choices: [
            'This [man] is the Son of God.',
            'He is this Son of God.',
            'The Son of this God is here.',
            'This is the God of the Son.'
          ],
          note: 'Demonstrative οὗτος (near, "this") in predicate position to ὁ υἱός — both nominative across a linking εἰμί.'
        },
        {
          g: 'ἐκεῖνος γὰρ καλεῖ τοὺς δούλους αὐτοῦ.',
          level: 2,
          en: 'For that one calls his slaves.',
          choices: [
            'For that one calls his slaves.',
            'For that one\'s slaves call him.',
            'That one is the slave of him.',
            'He calls those slaves.'
          ],
          note: 'ἐκεῖνος (far demonstrative, "that"). γάρ postpositive. αὐτοῦ ("his", 3rd-pers. gen.) attaches to τοὺς δούλους.'
        },
        {
          g: 'ἐγὼ καὶ ὁ πατὴρ ἕν ἐσμεν.',
          level: 2,
          en: 'I and the Father are one.',
          choices: [
            'I and the Father are one.',
            'I and the Father are alone.',
            'I am one with the Father.',
            'We are the Father.'
          ],
          note: 'ἕν (neut. nom. sg. of εἷς) used predicatively for unity. ἐσμέν = 1st-pl. of εἰμί.'
        },
        {
          g: 'βλέπομεν αὐτὸν ἡμεῖς, ὑμεῖς δὲ οὐ πιστεύετε εἰς αὐτόν.',
          level: 3,
          en: 'We (emphatic) see him, but you (pl., emphatic) do not believe in him.',
          choices: [
            'We (emphatic) see him, but you (pl., emphatic) do not believe in him.',
            'We do not see him, but you believe in him.',
            'He sees us, but he does not believe in you.',
            'We see him; he does not believe in you.'
          ],
          note: 'Explicit ἡμεῖς / ὑμεῖς signal contrast / emphasis (the verb already encodes person); δέ is postpositive ("but / and").'
        },
        {
          g: 'οὐχ οὗτος ἐστιν ὁ ἄρτος, ἀλλ’ ἐκεῖνος ὁ ἐκ τοῦ οὐρανοῦ.',
          level: 3,
          en: 'This is not the bread, but that one [is] — the one from heaven.',
          choices: [
            'This is not the bread, but that one [is] — the one from heaven.',
            'This bread is not from heaven, but that one is.',
            'Not this is bread, but that one of heaven [is bread].',
            'This is the bread; that one is from heaven.'
          ],
          note: 'οὐχ before rough breathing. Article + prepositional phrase (ὁ ἐκ τοῦ οὐρανοῦ) functions as a relative clause: "the one [who is] from heaven".'
        },
        {
          g: 'αὕτη ἐστὶν ἡ ὥρα ἐν ᾗ ὁ κύριος καλεῖ τοὺς ἰδίους.',
          level: 3,
          en: 'This is the hour in which the Lord calls his own.',
          choices: [
            'This is the hour in which the Lord calls his own.',
            'This is the Lord\'s hour, and he calls them.',
            'In this hour those who are his own call the Lord.',
            'The Lord\'s hour, in which he is called by his own, is this.'
          ],
          note: 'Two demonstratives: αὕτη (fem. nom. of οὗτος) + ἡ ὥρα (fem.) → predicate. ᾗ = dat. fem. of relative ὅς; ἐν governs the dative. τοὺς ἰδίους = substantival adjective ("his own [people]").'
        }
      ]
    },

    10: {
      sentences: [
        {
          g: 'ὁ ἄνθρωπος ὃς ἀκούει τὸν λόγον πιστεύει.',
          level: 1,
          en: 'The man who hears the word believes.',
          choices: [
            'The man who hears the word believes.',
            'The man hears the word that believes.',
            'The word that the man hears believes.',
            'The man who believes hears the word.'
          ],
          note: 'ὅς (nom. sg. masc.) is the relative pronoun; it agrees with its antecedent ὁ ἄνθρωπος in gender/number, and its case (nom.) comes from being the subject of ἀκούει inside the relative clause.'
        },
        {
          g: 'ταῦτά εἰσιν τὰ ἔργα ἃ ποιεῖ.',
          level: 1,
          en: 'These are the works which he does.',
          choices: [
            'These are the works which he does.',
            'These works are done by him.',
            'These are the works of his doing.',
            'He works these things which he does.'
          ],
          note: 'ταῦτα = neut. nom. pl. of οὗτος. Relative ἅ (neut. nom./acc. pl.) — here acc. as object of ποιεῖ.'
        },
        {
          g: 'βλέπω τὸν ἄγγελον ὃν πέμπει ὁ θεός.',
          level: 1,
          en: 'I see the angel whom God sends.',
          choices: [
            'I see the angel whom God sends.',
            'God sees the angel whom I send.',
            'I send the angel; God sees [him].',
            'I see God\'s angel and send [him].'
          ],
          note: 'Relative ὅν (acc. sg. masc.): agrees with antecedent τὸν ἄγγελον in gender/number, and is acc. because it is the object of πέμπει inside the rel. clause.'
        },
        {
          g: 'ἐγὼ λέγω ὑμῖν ὅτι αὐτός ἐστιν ὁ κύριος.',
          level: 2,
          en: 'I tell you that he is the Lord.',
          choices: [
            'I tell you that he is the Lord.',
            'I tell the Lord about you.',
            'He tells you that I am the Lord.',
            'You tell me that he is the Lord.'
          ],
          note: 'ὅτι after a verb of saying introduces the indirect statement; the embedded clause stays in its own indicative.'
        },
        {
          g: 'γινώσκομεν ὅτι ἀληθής ἐστιν ὁ λόγος.',
          level: 2,
          en: 'We know that the word is true.',
          choices: [
            'We know that the word is true.',
            'We say the word is true.',
            'The true word knows us.',
            'We know the true word is.'
          ],
          note: 'Verb of perception (γινώσκομεν) + ὅτι + indicative = indirect statement. ἀληθής is in the predicate (no article).'
        },
        {
          g: 'εἰ ἀκούει ὁ ἀδελφός, πιστεύει.',
          level: 2,
          en: 'If the brother hears, he believes.',
          choices: [
            'If the brother hears, he believes.',
            'When the brother hears, he believed.',
            'The brother hears that he believes.',
            'Although the brother hears, he does not believe.'
          ],
          note: 'εἰ + indicative (ἀκούει) = simple condition (1st-class). The apodosis is also in the indicative.'
        },
        {
          g: 'ἐστὶν ἡ ἡμέρα ἐν ᾗ ὁ κύριος ἔρχεται.',
          level: 3,
          en: 'It is the day on which the Lord comes.',
          choices: [
            'It is the day on which the Lord comes.',
            'It is the Lord’s day on which he comes.',
            'On the day the Lord comes is.',
            'The day comes on the Lord.'
          ],
          note: 'ᾗ = dat. sg. fem. of the relative pronoun, in the dative because ἐν "in" governs the dative. Antecedent ἡ ἡμέρα is fem. sg.'
        },
        {
          g: 'ὁ ἄνθρωπος οὗ τοὺς λόγους ἠκούσαμεν διδάσκει ἡμᾶς.',
          level: 3,
          en: 'The man whose words we heard teaches us.',
          choices: [
            'The man whose words we heard teaches us.',
            'The man teaches us whose words we heard.',
            'We heard the man\'s words that he taught us.',
            'The man heard our words and teaches us.'
          ],
          note: 'οὗ = gen. sg. masc. of relative ὅς ("whose"). Inside the rel. clause it modifies τοὺς λόγους. Main verb (διδάσκει) comes after the embedded clause.'
        },
        {
          g: 'εἰ μένει ὁ ἀπόστολος ἐν τῇ πόλει, ἀκούουσιν αὐτοῦ οἱ ἁμαρτωλοί.',
          level: 3,
          en: 'If the apostle remains in the city, the sinners hear him.',
          choices: [
            'If the apostle remains in the city, the sinners hear him.',
            'When the sinners remain in the city, the apostle hears them.',
            'The apostle in the city does not hear the sinners.',
            'If the sinners hear, the apostle remains in the city.'
          ],
          note: 'εἰ + ind. simple condition. ἀκούω often takes a genitive of the person heard (αὐτοῦ).'
        }
      ]
    },

    11: {
      sentences: [
        {
          g: 'ὁ θεὸς ἀπέστειλεν τὸν υἱὸν αὐτοῦ εἰς τὸν κόσμον.',
          level: 1,
          en: 'God sent his son into the world.',
          choices: [
            'God sent his son into the world.',
            'The son of God sent the world.',
            'God will send his son into the world.',
            'His son sends God into the world.'
          ],
          note: 'ἀπέστειλεν: aorist of ἀποστέλλω. Liquid stem (-στελ-) drops the σ in the aorist and shows the stem-vowel change.'
        },
        {
          g: 'εἶπεν ὁ Ἰησοῦς τοῖς μαθηταῖς.',
          level: 1,
          en: 'Jesus spoke to the disciples.',
          choices: [
            'Jesus spoke to the disciples.',
            'Jesus speaks to the disciples.',
            'The disciples spoke to Jesus.',
            'Jesus will speak to the disciples.'
          ],
          note: 'εἶπεν: 2nd aorist of λέγω (suppletive root εἰπ-). Dative of indirect object: τοῖς μαθηταῖς.'
        },
        {
          g: 'ἤγαγον τὸν τυφλὸν πρὸς τὸν Ἰησοῦν.',
          level: 1,
          en: 'They led the blind man to Jesus.',
          choices: [
            'They led the blind man to Jesus.',
            'They lead the blind man to Jesus.',
            'They will lead the blind man to Jesus.',
            'The blind man led them to Jesus.'
          ],
          note: '2nd aorist of ἄγω: ἤγαγον. The aor. stem is reduplicated (ἀγ→ ηγαγ-). 3rd-pl. ending -ον.'
        },
        {
          g: 'οἱ μαθηταὶ ἔμενον ἐν τῷ οἴκῳ.',
          level: 2,
          en: 'The disciples were remaining in the house.',
          choices: [
            'The disciples were remaining in the house.',
            'The disciples remained in the house.',
            'The disciples remain in the house.',
            'The disciples will remain in the house.'
          ],
          note: 'ἔμενον = imperfect of μένω (augment ε- + present stem μεν- + secondary -ον). Imperfect = ongoing or repeated past action.'
        },
        {
          g: 'τῷ λαῷ ἐπίστευον αἱ γυναῖκες.',
          level: 2,
          en: 'The women were believing the people.',
          choices: [
            'The women were believing the people.',
            'The women believed the people.',
            'The people were believing the women.',
            'The women trust the people.'
          ],
          note: 'Imperfect ἐπίστευον (3rd-pl., same form as 1st-sg. — context decides). πιστεύω takes a dative.'
        },
        {
          g: 'τότε ἀπῆλθον οἱ ἀπόστολοι εἰς ἑτέραν πόλιν.',
          level: 2,
          en: 'Then the apostles went away into another city.',
          choices: [
            'Then the apostles went away into another city.',
            'Then the apostles went into another city.',
            'The apostles always went into another city.',
            'Then the apostles came to another city.'
          ],
          note: 'ἀπῆλθον: 2nd-aor. of ἀπέρχομαι (deponent in present, but its 2nd-aor. ἀπῆλθον takes active endings — typical of suppletive roots).'
        },
        {
          g: 'ὅτε ἦλθεν ὁ κύριος εἰς τὴν Γαλιλαίαν, εἶδον αὐτὸν οἱ Φαρισαῖοι.',
          level: 3,
          en: 'When the Lord came into Galilee, the Pharisees saw him.',
          choices: [
            'When the Lord came into Galilee, the Pharisees saw him.',
            'When the Pharisees came into Galilee, they saw the Lord.',
            'Then the Lord saw the Pharisees in Galilee.',
            'Whenever the Lord goes to Galilee, the Pharisees see him.'
          ],
          note: 'Two different 2nd aorists: ἦλθεν (ἔρχομαι, suppletive root ἐλθ-) and εἶδον (ὁράω, suppletive root ἰδ-).'
        },
        {
          g: 'ἔβαλον τοὺς ἄρτους εἰς τὸν οἶκον, καὶ ἔφαγον οἱ μαθηταί.',
          level: 3,
          en: 'They threw the loaves into the house, and the disciples ate.',
          choices: [
            'They threw the loaves into the house, and the disciples ate.',
            'They will throw the loaves into the house, and the disciples will eat.',
            'They threw and ate the loaves of the disciples in the house.',
            'The disciples threw the loaves and ate in the house.'
          ],
          note: 'Two 2nd-aorists in sequence: ἔβαλον (βάλλω) and ἔφαγον (suppletive — ἐσθίω → 2nd-aor. ἔφαγον).'
        },
        {
          g: 'ὅτε εἶπεν ταῦτα ὁ Ἰησοῦς, ἀπῆλθον ἐκ τοῦ ἱεροῦ οἱ Ἰουδαῖοι, οὐκ ἐπίστευσαν γὰρ εἰς αὐτόν.',
          level: 3,
          en: 'When Jesus said these things, the Jews went away from the temple, for they did not believe in him.',
          choices: [
            'When Jesus said these things, the Jews went away from the temple, for they did not believe in him.',
            'Jesus said these things, and the Jews went away believing in him.',
            'When the Jews said these things, Jesus went away from the temple.',
            'Jesus said: the Jews went away from the temple because they believed.'
          ],
          note: 'Three aorists in sequence (εἶπεν, ἀπῆλθον, ἐπίστευσαν). γάρ postpositive ("for"). πιστεύω + εἰς + acc. = "believe in".'
        }
      ]
    },

    12: {
      sentences: [
        {
          g: 'ὁ πατὴρ φιλεῖ τὸν υἱόν.',
          level: 1,
          en: 'The father loves the son.',
          choices: [
            'The father loves the son.',
            'The son loves the father.',
            'The father sees the son.',
            'The fathers love the sons.'
          ],
          note: 'πατήρ is 3rd-decl. (nom. sg. πατήρ, acc. sg. πατέρα). φιλεῖ contracts from φιλέ-ει.'
        },
        {
          g: 'ἡ μήτηρ ἀγαπᾷ τὸ τέκνον.',
          level: 1,
          en: 'The mother loves the child.',
          choices: [
            'The mother loves the child.',
            'The child loves the mother.',
            'The mother sees the child.',
            'The mothers love the children.'
          ],
          note: 'μήτηρ: 3rd-decl. like πατήρ (nom. sg. μήτηρ, gen. sg. μητρός). ἀγαπᾷ = α-contract.'
        },
        {
          g: 'τὸ πῦρ ἐστιν ἐν τῷ ἱερῷ.',
          level: 1,
          en: 'The fire is in the temple.',
          choices: [
            'The fire is in the temple.',
            'The temple is in the fire.',
            'There is fire in the temple.',
            'The fire of the temple is.'
          ],
          note: 'πῦρ is 3rd-decl. neut. (nom./acc. sg. πῦρ, gen. πυρός). ἐν + dat. for location.'
        },
        {
          g: 'ἡ γυνὴ λαμβάνει τὸν ἄρτον ἀπὸ τῆς χειρὸς αὐτοῦ.',
          level: 2,
          en: 'The woman takes the bread from his hand.',
          choices: [
            'The woman takes the bread from his hand.',
            'The woman gives the bread to his hand.',
            'The bread takes the woman from his hand.',
            'The hand of the woman takes his bread.'
          ],
          note: 'γυνή / γυναικός = 3rd-decl. fem.; χείρ / χειρός = 3rd-decl. fem. (gen. sg. ending -ος).'
        },
        {
          g: 'τὸ ὕδωρ τοῦ ποταμοῦ καθαρόν ἐστιν.',
          level: 2,
          en: 'The water of the river is pure.',
          choices: [
            'The water of the river is pure.',
            'The river of pure water is.',
            'The pure river of water.',
            'The water and the river are pure.'
          ],
          note: 'ὕδωρ: 3rd-decl. neut. (gen. sg. ὕδατος). καθαρόν is predicate (no article); ἐστιν makes it explicit.'
        },
        {
          g: 'ὁ ἀνὴρ ἔφερεν τὰ τέκνα πρὸς τὴν μητέρα.',
          level: 2,
          en: 'The man was bringing the children to the mother.',
          choices: [
            'The man was bringing the children to the mother.',
            'The man brought the children to the mother.',
            'The mother was bringing the children to the man.',
            'The men were bringing the child to the mother.'
          ],
          note: 'ἀνήρ: 3rd-decl. masc. (gen. ἀνδρός — note the inserted -δ-). ἔφερεν = imperfect of φέρω.'
        },
        {
          g: 'ἐν τῇ νυκτὶ ἐγένετο φωνή.',
          level: 3,
          en: 'In the night a voice came.',
          choices: [
            'In the night a voice came.',
            'The voice came in the night.',
            'There was no voice in the night.',
            'The night had a voice.'
          ],
          note: 'ἐγένετο: 2nd aorist of γίνομαι ("become / happen"); often translated "there was / it came to pass". νύξ → dat. sg. νυκτί.'
        },
        {
          g: 'τῇ μητρὶ τοῦ ἀνδρὸς ἤνεγκαν τὰ ἱμάτια αἱ γυναῖκες.',
          level: 3,
          en: 'The women brought the garments to the man\'s mother.',
          choices: [
            'The women brought the garments to the man\'s mother.',
            'The man\'s mother brought the garments to the women.',
            'The women\'s mother brought the man\'s garments.',
            'The women were bringing the man\'s mother garments.'
          ],
          note: 'Dative phrase fronted (τῇ μητρὶ τοῦ ἀνδρός). ἤνεγκαν: aor. of φέρω (suppletive root ἐνεγκ-). Subject (αἱ γυναῖκες) at the end.'
        },
        {
          g: 'οὐκ ἔμαθεν ὁ ἀνὴρ τὴν ἀλήθειαν, καίτοι ἔχει ὦτα τοῦ ἀκούειν.',
          level: 3,
          en: 'The man did not learn the truth, although he has ears for hearing.',
          choices: [
            'The man did not learn the truth, although he has ears for hearing.',
            'The man learned the truth and has ears to hear.',
            'The man\'s ears do not hear, but he learned the truth.',
            'Although the man has ears, he did not have the truth to hear.'
          ],
          note: 'οὖς ("ear"): 3rd-decl. neut., gen. ὠτός, nom./acc. pl. ὦτα. τοῦ + infinitive (articular inf.) for purpose: "for hearing". ἔμαθεν = 2nd-aor. of μανθάνω.'
        }
      ]
    },

    13: {
      sentences: [
        {
          g: 'πᾶς ὁ λαὸς ἤκουσεν τὰ ῥήματα τοῦ προφήτου.',
          level: 1,
          en: 'All the people heard the words of the prophet.',
          choices: [
            'All the people heard the words of the prophet.',
            'The whole people heard one word of the prophet.',
            'Every word of the prophet heard the people.',
            'The people heard everything from the prophet.'
          ],
          note: 'πᾶς + article + noun = "all the / the whole"; without article = "every".'
        },
        {
          g: 'τὸ πνεῦμα τοῦ θεοῦ ἐστιν ἐν αὐτῷ.',
          level: 1,
          en: 'The Spirit of God is in him.',
          choices: [
            'The Spirit of God is in him.',
            'God\'s spirit is upon him.',
            'God is in his spirit.',
            'The spirit and God are in him.'
          ],
          note: 'πνεῦμα: 3rd-decl. neut. with -ματ- stem (gen. sg. πνεύματος).'
        },
        {
          g: 'τὸ ὄνομα τοῦ βασιλέως μέγα ἐστίν.',
          level: 1,
          en: 'The name of the king is great.',
          choices: [
            'The name of the king is great.',
            'The king\'s great name is.',
            'A great king\'s name is.',
            'The great name is king.'
          ],
          note: 'ὄνομα: 3rd-decl. neut., -ματ- stem (gen. ὀνόματος). βασιλεύς: 3rd-decl. masc. (gen. βασιλέως).'
        },
        {
          g: 'εἷς γάρ ἐστιν ὁ θεὸς καὶ εἷς ὁ κύριος.',
          level: 2,
          en: 'For God is one, and the Lord is one.',
          choices: [
            'For God is one, and the Lord is one.',
            'For one God is the Lord and one is the Lord.',
            'God and the Lord are first.',
            'There is no God; one is the Lord.'
          ],
          note: 'εἷς = "one" (masc. nom. sg.); γάρ ("for") is postpositive — never first in its clause.'
        },
        {
          g: 'οὐδεὶς ἔχει τοιαύτην πίστιν ἐν τῷ Ἰσραήλ.',
          level: 2,
          en: 'No one has such faith in Israel.',
          choices: [
            'No one has such faith in Israel.',
            'No one has had such faith in Israel.',
            'Such faith is not in Israel.',
            'Anyone has such faith in Israel.'
          ],
          note: 'οὐδείς (compound of οὐδέ + εἷς) = "no one". πίστις: 3rd-decl. fem. -ι type (acc. sg. πίστιν, gen. πίστεως).'
        },
        {
          g: 'πάντα τὰ ἔθνη πιστεύσει εἰς τὸ ὄνομα αὐτοῦ.',
          level: 2,
          en: 'All the nations will believe in his name.',
          choices: [
            'All the nations will believe in his name.',
            'All the nations believe in his name.',
            'Every nation will believe his name.',
            'In all the nations he will believe.'
          ],
          note: 'πᾶς + article in neuter plural agrees with τὰ ἔθνη ("all the nations"). ἔθνος: 3rd-decl. neut. -ος / -ους type.'
        },
        {
          g: 'ὁ βασιλεὺς εἶπεν τοῖς γραμματεῦσιν ὅτι ἐν τῇ πόλει ἐστὶν χάρις.',
          level: 3,
          en: 'The king told the scribes that there is grace in the city.',
          choices: [
            'The king told the scribes that there is grace in the city.',
            'The scribes told the king that the city has grace.',
            'The king saw the scribes in the city of grace.',
            'The scribes are kings; in the city is grace.'
          ],
          note: 'Several new 3rd-decl. forms: βασιλεύς / βασιλέως, γραμματεύς / dat. pl. γραμματεῦσιν, πόλις / πόλει (-ι declension), χάρις / χάριτος.'
        },
        {
          g: 'ὁ ἀρχιερεὺς προσήνεγκε τὸ θέλημα τοῦ θεοῦ τῷ ὄχλῳ διὰ τοῦ ῥήματος τοῦ ἀποστόλου.',
          level: 3,
          en: 'The high priest brought the will of God to the crowd through the word of the apostle.',
          choices: [
            'The high priest brought the will of God to the crowd through the word of the apostle.',
            'The will of God brought the high priest to the apostle through the crowd.',
            'The crowd of the apostle brought God\'s word to the high priest.',
            'Through the high priest God brought his will to the apostle\'s crowd.'
          ],
          note: 'ἀρχιερεύς: 3rd-decl. -εύς. θέλημα, ῥῆμα: -ματ- type. προσήνεγκε: aorist of προσφέρω. διά + gen. = "through, by means of".'
        },
        {
          g: 'πᾶν τὸ πλῆθος ἐθαύμασεν περὶ τῶν ἔργων τῆς δυνάμεως τοῦ κυρίου.',
          level: 3,
          en: 'The whole multitude marveled concerning the works of the Lord\'s power.',
          choices: [
            'The whole multitude marveled concerning the works of the Lord\'s power.',
            'The whole multitude of works marveled at the Lord\'s power.',
            'All the multitudes\' powerful works concerning the Lord marveled.',
            'The Lord\'s powerful work caused all the multitudes to marvel.'
          ],
          note: 'πλῆθος: 3rd-decl. neut. -ος / -ους. πᾶν agrees in gender. δύναμις: -ι / -εως. Stacked genitives drill: τῶν ἔργων → τῆς δυνάμεως → τοῦ κυρίου.'
        }
      ]
    },

    14: {
      sentences: [
        {
          g: 'ὁ λέγων τὸ εὐαγγέλιον ἐστὶν ὁ ἀπόστολος.',
          level: 1,
          en: 'The one speaking the gospel is the apostle.',
          choices: [
            'The one speaking the gospel is the apostle.',
            'The apostle is speaking the gospel.',
            'The gospel is being spoken by the apostle.',
            'The apostle was speaking the gospel.'
          ],
          note: 'ὁ λέγων: present active participle used substantivally — "the one who speaks". Article + participle (no noun) makes a noun phrase.'
        },
        {
          g: 'οἱ ἀκούοντες τὸν λόγον σώζονται.',
          level: 1,
          en: 'Those hearing the word are saved.',
          choices: [
            'Those hearing the word are saved.',
            'Those who hear the word save [others].',
            'They save those who hear the word.',
            'The hearer of the word saves [himself].'
          ],
          note: 'οἱ ἀκούοντες: substantival pres. act. ptcp. (masc. nom. pl.) = "the [ones] hearing". σώζονται: pres. mid./pass. ("are saved").'
        },
        {
          g: 'ὁ πιστεύων εἰς ἐμὲ ἔχει ζωήν.',
          level: 1,
          en: 'The one believing in me has life.',
          choices: [
            'The one believing in me has life.',
            'I believe in him; he has life.',
            'Whoever has life believes in me.',
            'The believer has my life.'
          ],
          note: 'ὁ πιστεύων: substantival ptcp., "the one who believes". πιστεύω + εἰς + acc. = "believe in".'
        },
        {
          g: 'ὁ Ἰησοῦς, βλέπων τὸν ὄχλον, διδάσκει αὐτούς.',
          level: 2,
          en: 'Jesus, seeing the crowd, teaches them.',
          choices: [
            'Jesus, seeing the crowd, teaches them.',
            'Jesus sees the crowd; they teach him.',
            'Jesus, having seen the crowd, taught them.',
            'The crowd, seeing Jesus, teaches him.'
          ],
          note: 'Anarthrous participle (βλέπων) agreeing with the subject = circumstantial / adverbial use ("while seeing", "since he sees"). Present participle ⇒ same time as the main verb.'
        },
        {
          g: 'ἀκούσαντες τὸν λόγον ἐπίστευσαν.',
          level: 2,
          en: 'Having heard the word, they believed.',
          choices: [
            'Having heard the word, they believed.',
            'They were hearing the word and believed.',
            'They heard the word; they did not believe.',
            'Those who hear the word believe.'
          ],
          note: 'ἀκούσαντες: aor. act. ptcp. (masc. nom. pl.). Aorist participle ⇒ time prior to main verb ("having heard ... they then believed").'
        },
        {
          g: 'ὁ προφήτης ὁ διδάσκων ἐν τῷ ἱερῷ ὑπάγει εἰς τὴν πόλιν.',
          level: 2,
          en: 'The prophet who teaches in the temple goes into the city.',
          choices: [
            'The prophet who teaches in the temple goes into the city.',
            'The prophet teaches the city to the temple.',
            'The prophet of the temple teaches in the city.',
            'The teaching prophet of the temple is in the city.'
          ],
          note: 'Article-noun-article-participle (second attributive position): ὁ προφήτης ὁ διδάσκων = "the prophet who teaches".'
        },
        {
          g: 'λέγοντος τοῦ Ἰησοῦ ταῦτα, οἱ μαθηταὶ ἤκουον αὐτοῦ.',
          level: 3,
          en: 'While Jesus was saying these things, the disciples were listening to him.',
          choices: [
            'While Jesus was saying these things, the disciples were listening to him.',
            'While the disciples were saying these things, Jesus was listening to them.',
            'After Jesus said these things, the disciples spoke to him.',
            'Jesus, the disciples speaking these things, listened to him.'
          ],
          note: 'Genitive absolute: a participle (λέγοντος) plus its own subject (τοῦ Ἰησοῦ), both in the genitive, syntactically detached from the main clause.'
        },
        {
          g: 'ἐλθὼν εἰς τὸν οἶκον, ηὗρεν τοὺς μαθητὰς ἀκούοντας τὸν λόγον.',
          level: 3,
          en: 'Having come into the house, he found the disciples listening to the word.',
          choices: [
            'Having come into the house, he found the disciples listening to the word.',
            'When he came into the house, the disciples were listening to him.',
            'Coming into the house, the disciples found the word.',
            'He came and listened to the word in the disciples\' house.'
          ],
          note: 'Two participles: ἐλθών (aor. ptcp., "having come") modifying the subject; ἀκούοντας (pres. ptcp., acc. pl.) modifying the object τοὺς μαθητάς.'
        },
        {
          g: 'ὄντων τῶν μαθητῶν ἐν τῷ πλοίῳ, ἐγένετο σεισμὸς μέγας ἐν τῇ θαλάσσῃ.',
          level: 3,
          en: 'While the disciples were in the boat, a great earthquake happened on the sea.',
          choices: [
            'While the disciples were in the boat, a great earthquake happened on the sea.',
            'While there was a great earthquake at sea, the disciples were in a boat.',
            'In the disciples\' boat there was a sea-quake.',
            'The disciples in the boat made a great earthquake at sea.'
          ],
          note: 'Genitive absolute with the participle of εἰμί: ὄντων τῶν μαθητῶν = "while the disciples were". ἐγένετο = 2nd-aor. middle of γίνομαι.'
        }
      ]
    },

    15: {
      sentences: [
        {
          g: 'ὁ λόγος ἐλαλήθη ὑπὸ τοῦ προφήτου.',
          level: 1,
          en: 'The word was spoken by the prophet.',
          choices: [
            'The word was spoken by the prophet.',
            'The prophet spoke the word.',
            'The word will be spoken by the prophet.',
            'The prophet’s word is spoken.'
          ],
          note: 'Aorist passive: stem + θη + secondary endings (-ν / – / -σαν). ὑπό + genitive marks the personal agent.'
        },
        {
          g: 'ὁ ἄρτος δίδοται τοῖς πτωχοῖς.',
          level: 1,
          en: 'The bread is given to the poor.',
          choices: [
            'The bread is given to the poor.',
            'The poor give bread.',
            'The bread was given to the poor.',
            'The poor are given to the bread.'
          ],
          note: 'δίδοται: present mid./pass. 3rd-sg. (here passive). Dative τοῖς πτωχοῖς = indirect object retained in the passive.'
        },
        {
          g: 'οἱ μαθηταὶ ἐδιδάσκοντο ἐν τῷ ἱερῷ.',
          level: 1,
          en: 'The disciples were being taught in the temple.',
          choices: [
            'The disciples were being taught in the temple.',
            'The disciples taught in the temple.',
            'The disciples are being taught in the temple.',
            'The temple taught the disciples.'
          ],
          note: 'ἐ-διδάσκ-οντο: imperfect mid./pass. (here passive). 3rd-pl. mid./pass. ending -οντο.'
        },
        {
          g: 'ἐβαπτίσθησαν οἱ μαθηταὶ ἐν τῇ θαλάσσῃ.',
          level: 2,
          en: 'The disciples were baptized in the sea.',
          choices: [
            'The disciples were baptized in the sea.',
            'The disciples baptized themselves in the sea.',
            'The sea baptized the disciples.',
            'The disciples will be baptized in the sea.'
          ],
          note: 'ἐ-βαπτι-σ-θη-σαν: augment + stem + σ (root final dental + σ → σ) + θη + 3rd-pl. secondary -σαν.'
        },
        {
          g: 'σωθήσεσθε διὰ τῆς πίστεως.',
          level: 2,
          en: 'You will be saved through faith.',
          choices: [
            'You will be saved through faith.',
            'You are saved through faith.',
            'You were saved through faith.',
            'You will save through faith.'
          ],
          note: 'σωθήσεσθε: future passive 2nd-pl. of σώζω. Future passive built on θη + future-mid. endings (-θησομαι).'
        },
        {
          g: 'τὰ τέκνα ἀπεκρίθη τῷ προφήτῃ.',
          level: 2,
          en: 'The children answered the prophet.',
          choices: [
            'The children answered the prophet.',
            'The prophet answered the children.',
            'The children were answered by the prophet.',
            'The children will answer the prophet.'
          ],
          note: 'ἀπεκρίθη: aor. passive in form, active in meaning ("answered"). With neuter plural subject, sg. verb is normal. Dative τῷ προφήτῃ = recipient.'
        },
        {
          g: 'διὰ τοῦ Χριστοῦ σῴζονται οἱ ἁμαρτωλοί.',
          level: 3,
          en: 'Through Christ the sinners are saved.',
          choices: [
            'Through Christ the sinners are saved.',
            'Through the sinners Christ is saved.',
            'Because of Christ the sinners save themselves.',
            'By Christ the sinners were saved.'
          ],
          note: 'σῴζονται: present mid./pass. 3rd pl. (-ονται). διά + genitive = "through, by means of"; διά + accusative would be "because of".'
        },
        {
          g: 'ἠγέρθη ὁ κύριος ἐκ νεκρῶν, καὶ ἐφανερώθη τοῖς μαθηταῖς.',
          level: 3,
          en: 'The Lord was raised from [the] dead and was made manifest to the disciples.',
          choices: [
            'The Lord was raised from [the] dead and was made manifest to the disciples.',
            'The Lord raised the dead and revealed himself to the disciples.',
            'The dead Lord was raised by the disciples and revealed himself.',
            'The Lord made the disciples rise from the dead and appear.'
          ],
          note: 'Two aorist passives in series: ἠγέρθη (ἐγείρω), ἐφανερώθη (φανερόω). νεκρῶν is gen. pl. of substantive adj. ("[the] dead").'
        },
        {
          g: 'ὑπὸ τοῦ θεοῦ ἐπέμφθη εἰς τὸν κόσμον ὁ ἀπόστολος, ἵνα κηρύξῃ τὸ εὐαγγέλιον.',
          level: 3,
          en: 'The apostle was sent into the world by God, in order to preach the gospel.',
          choices: [
            'The apostle was sent into the world by God, in order to preach the gospel.',
            'God sent the apostle, and the gospel was preached in the world.',
            'The apostle sent the gospel into God\'s world.',
            'The world\'s apostle preached the gospel of God.'
          ],
          note: 'ἐπέμφθη: aor. pass. of πέμπω (-π + θ → -φθ). ὑπό + gen. = personal agent. ἵνα + subj. (κηρύξῃ) = purpose clause (formally introduced in ch 17).'
        }
      ]
    },

    16: {
      sentences: [
        {
          g: 'γέγραπται ἐν τῷ νόμῳ.',
          level: 1,
          en: 'It has been written in the law.',
          choices: [
            'It has been written in the law.',
            'It is being written in the law.',
            'It will be written in the law.',
            'It was being written in the law.'
          ],
          note: 'γέγραπται: perfect mid./pass. 3rd sg. of γράφω. Reduplication γέ- + perfect stem; the perfect signals a present standing result of a past act.'
        },
        {
          g: 'πεπίστευκα εἰς τὸν Χριστόν.',
          level: 1,
          en: 'I have believed in Christ.',
          choices: [
            'I have believed in Christ.',
            'I believe in Christ.',
            'I believed in Christ.',
            'I will believe in Christ.'
          ],
          note: 'πεπίστευκα: perfect act. 1st-sg. of πιστεύω. Reduplication πε- + κ + α-class. Perfect = present standing result of a past act of believing.'
        },
        {
          g: 'ὁ Ἰησοῦς ἐλήλυθεν εἰς τὸν κόσμον.',
          level: 1,
          en: 'Jesus has come into the world.',
          choices: [
            'Jesus has come into the world.',
            'Jesus comes into the world.',
            'Jesus came into the world.',
            'Jesus will come into the world.'
          ],
          note: 'ἐλήλυθεν: perfect of ἔρχομαι (suppletive — perfect built on root ἐλυθ-/ἐληλυθ-). 3rd-sg. perfect.'
        },
        {
          g: 'λέλυκα τὰ ἔργα τοῦ διαβόλου.',
          level: 2,
          en: 'I have loosed / undone the works of the devil.',
          choices: [
            'I have loosed the works of the devil.',
            'I loose the works of the devil.',
            'I will loose the works of the devil.',
            'The devil’s works have loosed me.'
          ],
          note: 'λέλυκα: perfect active 1st sg. of λύω — reduplication λε- + κ + α-class endings.'
        },
        {
          g: 'τετήρηκας τὸν λόγον μου.',
          level: 2,
          en: 'You have kept my word.',
          choices: [
            'You have kept my word.',
            'You kept my word.',
            'You keep my word.',
            'You will keep my word.'
          ],
          note: 'τετήρηκας: perfect act. 2nd-sg. of τηρέω. Reduplication τε-, lengthened stem (τηρη-), κ, α-class endings.'
        },
        {
          g: 'ὁ νόμος γέγραπται ἐπὶ τὰς καρδίας ἡμῶν.',
          level: 2,
          en: 'The law has been written on our hearts.',
          choices: [
            'The law has been written on our hearts.',
            'The law writes upon our hearts.',
            'Our hearts have written the law.',
            'The law was written on our hearts.'
          ],
          note: 'γέγραπται: perfect mid./pass. ἐπί + acc. = "upon" (with motion toward / location seen as a target). The perfect = standing inscription, not a one-time event.'
        },
        {
          g: 'ἑωράκαμεν τὴν δόξαν αὐτοῦ.',
          level: 3,
          en: 'We have seen his glory.',
          choices: [
            'We have seen his glory.',
            'We see his glory.',
            'His glory has seen us.',
            'We saw his glory.'
          ],
          note: 'ἑωράκαμεν: irregular perfect active 1st pl. of ὁράω. Compare aorist εἴδομεν — same lexeme, different aspect: perfect = "have seen and now retain the seeing".'
        },
        {
          g: 'πεφανέρωται ἡμῖν ἡ ἀλήθεια διὰ τοῦ ἀποστόλου τοῦ ἀπεσταλμένου.',
          level: 3,
          en: 'The truth has been revealed to us through the apostle who has been sent.',
          choices: [
            'The truth has been revealed to us through the apostle who has been sent.',
            'The apostle revealed our truth through being sent.',
            'Sending the apostle revealed our truth.',
            'The truth has been sent to us through the apostle\'s revelation.'
          ],
          note: 'Two perfect mid./pass. forms: πεφανέρωται (3rd-sg. of φανερόω) and ἀπεσταλμένου (perf. mid./pass. ptcp., gen. sg., of ἀποστέλλω).'
        },
        {
          g: 'πεπιστεύκαμεν καὶ ἐγνώκαμεν ὅτι ἐλήλυθεν ὁ υἱὸς τοῦ θεοῦ καὶ δέδωκεν ἡμῖν διάνοιαν.',
          level: 3,
          en: 'We have believed and have known that the Son of God has come and has given us understanding.',
          choices: [
            'We have believed and have known that the Son of God has come and has given us understanding.',
            'We believed; we knew the Son had come and was giving us understanding.',
            'We believe and know that the Son of God comes and gives us understanding.',
            'Believing and knowing, we received the Son of God\'s understanding.'
          ],
          note: 'Four perfects: πεπιστεύκαμεν, ἐγνώκαμεν (γινώσκω, irregular), ἐλήλυθεν (ἔρχομαι), δέδωκεν (δίδωμι). Each emphasizes the abiding result.'
        }
      ]
    },

    17: {
      sentences: [
        {
          g: 'ἦλθον ἵνα ζωὴν ἔχωσιν.',
          level: 1,
          en: 'I came in order that they might have life.',
          choices: [
            'I came in order that they might have life.',
            'I will come in order that they have life.',
            'They came so that I might have life.',
            'I am coming because they have life.'
          ],
          note: 'ἵνα + subjunctive (ἔχωσιν, pres. act. subj. 3rd pl.) = standard purpose clause. Long thematic vowel ω is the subjunctive marker.'
        },
        {
          g: 'προσεύχομαι ἵνα δοξάζωμεν τὸν θεόν.',
          level: 1,
          en: 'I pray that we may glorify God.',
          choices: [
            'I pray that we may glorify God.',
            'I pray, and we glorify God.',
            'Let us pray and glorify God.',
            'I prayed that we glorified God.'
          ],
          note: 'ἵνα + 1st-pl. pres. subj. (δοξάζωμεν). Subj. has long thematic vowel.'
        },
        {
          g: 'ἀγαπῶμεν ἀλλήλους.',
          level: 1,
          en: 'Let us love one another.',
          choices: [
            'Let us love one another.',
            'We love one another.',
            'We will love one another.',
            'They love one another.'
          ],
          note: 'Hortatory subjunctive: 1st-pl. pres. subj. of ἀγαπάω (contracted from ἀγαπά-ωμεν), meaning "let us …".'
        },
        {
          g: 'ἐὰν πιστεύσωμεν εἰς αὐτόν, σωθησόμεθα.',
          level: 2,
          en: 'If we believe in him, we will be saved.',
          choices: [
            'If we believe in him, we will be saved.',
            'If we believed in him, we were saved.',
            'If we save him, we will believe.',
            'Although we believe in him, we are not saved.'
          ],
          note: 'ἐάν + aorist subjunctive (πιστεύσωμεν) is the future-more-vivid conditional; the apodosis is a future-passive indicative (σωθησόμεθα).'
        },
        {
          g: 'μὴ φοβηθῆτε τοὺς ἀνθρώπους.',
          level: 2,
          en: 'Do not fear men.',
          choices: [
            'Do not fear men.',
            'Do not let men fear you.',
            'You will not fear men.',
            'Men do not fear you.'
          ],
          note: 'Prohibition: μή + aorist subj. (φοβηθῆτε, 2nd-pl. aor. pass./mid.-form subj. of φοβέομαι). Aspect-perfective prohibition: "don\'t (start to) fear".'
        },
        {
          g: 'οὐ μὴ ἀπολέσῃ ὁ θεὸς τοὺς ἁγίους αὐτοῦ.',
          level: 2,
          en: 'God will certainly not destroy his saints.',
          choices: [
            'God will certainly not destroy his saints.',
            'God will surely destroy his saints.',
            'God did not destroy his saints.',
            'May God not destroy his saints.'
          ],
          note: 'οὐ μή + aor. subj. (or fut. ind.) = emphatic negation. ἀπολέσῃ: aor. act. subj. 3rd-sg. of ἀπόλλυμι.'
        },
        {
          g: 'ὅταν ἔλθῃ ὁ υἱὸς τοῦ ἀνθρώπου ἐν τῇ δόξῃ αὐτοῦ, εὑρήσει τὴν πίστιν;',
          level: 3,
          en: 'When the Son of Man comes in his glory, will he find faith?',
          choices: [
            'When the Son of Man comes in his glory, will he find faith?',
            'When the Son of Man came in his glory, he found faith.',
            'Whenever the Son of Man comes, he loses his glory.',
            'The Son of Man will come and find his glory in faith.'
          ],
          note: 'ὅταν (= ὅτε + ἄν) + aorist subjunctive (ἔλθῃ) for an indefinite future temporal clause; main verb is future indicative.'
        },
        {
          g: 'ἐὰν τις τηρῇ τὸν λόγον μου, ὁ πατὴρ μου ἀγαπήσει αὐτόν, καὶ πρὸς αὐτὸν ἐλευσόμεθα.',
          level: 3,
          en: 'If anyone keeps my word, my Father will love him, and we will come to him.',
          choices: [
            'If anyone keeps my word, my Father will love him, and we will come to him.',
            'If my Father loves anyone, he keeps my word and comes to him.',
            'Whoever keeps my word loves my Father and comes.',
            'If we come to him, the Father will love anyone who keeps my word.'
          ],
          note: 'ἐάν + pres. subj. (τηρῇ) for general/iterative condition; future indicatives in apodosis (ἀγαπήσει, ἐλευσόμεθα — fut. of ἔρχομαι is suppletive ἐλεύσομαι).'
        },
        {
          g: 'ἵνα μὴ κρινώμεθα ὑπὸ τοῦ θεοῦ, μετανοῶμεν καὶ τηρῶμεν τὰς ἐντολὰς αὐτοῦ.',
          level: 3,
          en: 'In order that we may not be judged by God, let us repent and keep his commandments.',
          choices: [
            'In order that we may not be judged by God, let us repent and keep his commandments.',
            'God will not judge us if we repent and keep his commandments.',
            'Let us repent and keep his commandments, for God does not judge us.',
            'God\'s judgment of us makes us repent and keep his commandments.'
          ],
          note: 'Negative purpose ἵνα μή + pres. mid./pass. subj. (κρινώμεθα). Hortatory subj. with two contract verbs: μετανοῶμεν, τηρῶμεν.'
        }
      ]
    },

    18: {
      sentences: [
        {
          g: 'ἀκούσατε τὸν λόγον τοῦ θεοῦ.',
          level: 1,
          en: 'Hear (pl.) the word of God.',
          choices: [
            'Hear (pl.) the word of God.',
            'They hear the word of God.',
            'We have heard the word of God.',
            'He hears the word of God.'
          ],
          note: '1st-aorist active imperative 2nd pl.: aorist stem + σα + -τε. No augment (augment is indicative-only).'
        },
        {
          g: 'ἔγειρε τὸν παῖδα.',
          level: 1,
          en: 'Raise (sg.) the child.',
          choices: [
            'Raise (sg.) the child.',
            'You raise the child.',
            'Let him raise the child.',
            'Get up, child.'
          ],
          note: 'Pres. act. imperative 2nd-sg.: bare stem ending in -ε. Imperative inflects only in 2nd / 3rd person.'
        },
        {
          g: 'γράψον τὸ ὄνομά σου.',
          level: 1,
          en: 'Write (sg.) your name.',
          choices: [
            'Write (sg.) your name.',
            'You write your name.',
            'He writes your name.',
            'You wrote your name.'
          ],
          note: 'γράψον: 1st-aor. act. imperative 2nd-sg. (stem + σ + -ον). Aspect-perfective imperative.'
        },
        {
          g: 'θέλομεν εἶναι μετὰ τοῦ Χριστοῦ.',
          level: 2,
          en: 'We want to be with Christ.',
          choices: [
            'We want to be with Christ.',
            'We want Christ to be with us.',
            'We are with Christ.',
            'We are willing for Christ.'
          ],
          note: 'εἶναι = present active infinitive of εἰμί ("to be"). μετά + genitive = "with (in company with)".'
        },
        {
          g: 'καλόν ἐστιν μένειν ἐν τῷ οἴκῳ.',
          level: 2,
          en: 'It is good to remain in the house.',
          choices: [
            'It is good to remain in the house.',
            'It is good for the house to remain.',
            'The good thing remains in the house.',
            'Remaining in the house is the good [man].'
          ],
          note: 'Adjective + impersonal ἐστίν + complementary infinitive: καλόν ἐστιν + inf. ("it is good to V").'
        },
        {
          g: 'διὰ τὸ ἀκούειν τὸν λόγον ἐπίστευσαν.',
          level: 2,
          en: 'Because of hearing the word, they believed.',
          choices: [
            'Because of hearing the word, they believed.',
            'Through the hearing of the word they believed.',
            'They heard and believed the word\'s reason.',
            'In hearing the word they will believe.'
          ],
          note: 'διά + acc. + articular infinitive (τὸ ἀκούειν) = causal ("because of V-ing"). Note τὸν λόγον is the object inside the inf. clause.'
        },
        {
          g: 'πιστεύετε εἰς τὸν θεόν, καὶ εἰς ἐμὲ πιστεύετε.',
          level: 3,
          en: 'Believe in God, and believe in me.',
          choices: [
            'Believe in God, and believe in me.',
            'You believe in God, and you believe in me.',
            'Believe me about God, and believe me about myself.',
            'He believes in God; believe in me.'
          ],
          note: 'πιστεύετε is ambiguous in form between 2nd-pl. present indicative ("you believe") and present imperative ("believe!"). Context — parallel structure plus the second clause’s force — favours imperative.'
        },
        {
          g: 'ἐν τῷ προσεύχεσθαι αὐτοὺς ἐγένετο σεισμός.',
          level: 3,
          en: 'While they were praying, an earthquake happened.',
          choices: [
            'While they were praying, an earthquake happened.',
            'They prayed concerning the earthquake which happened.',
            'They were praying, and an earthquake will come.',
            'In praying, they caused an earthquake.'
          ],
          note: 'ἐν τῷ + inf. (προσεύχεσθαι, pres. mid. inf.) for contemporaneous time ("while V-ing"). The acc. αὐτούς is the subject of the inf.'
        },
        {
          g: 'εἶπεν τοῖς μαθηταῖς τοῦ ἀκολουθεῖν αὐτῷ καὶ τηρεῖν τὰς ἐντολὰς τοῦ πατρός.',
          level: 3,
          en: 'He told the disciples to follow him and to keep the commandments of the Father.',
          choices: [
            'He told the disciples to follow him and to keep the commandments of the Father.',
            'He told the disciples that they were following him and keeping the Father\'s commandments.',
            'The disciples spoke about following him and keeping the Father\'s commandments.',
            'He spoke the Father\'s commandments to the disciples who followed him.'
          ],
          note: 'τοῦ + inf. (here used after a verb of commanding) for purpose / indirect command. Two infinitives coordinated: τοῦ ἀκολουθεῖν … (καὶ) τηρεῖν.'
        }
      ]
    },

    19: {
      sentences: [
        {
          g: 'δίδωμι ὑμῖν εἰρήνην.',
          level: 1,
          en: 'I give peace to you.',
          choices: [
            'I give peace to you.',
            'I receive peace from you.',
            'You give me peace.',
            'Give peace to me.'
          ],
          note: 'δίδωμι is athematic (-μι) — stem alternates: long διδω- in the singular, short διδο- in the plural. ὑμῖν is the dative of indirect object.'
        },
        {
          g: 'τίθημι τὴν ψυχήν μου ὑπὲρ τῶν προβάτων.',
          level: 1,
          en: 'I lay down my life on behalf of the sheep.',
          choices: [
            'I lay down my life on behalf of the sheep.',
            'I take up my life for the sheep.',
            'I have laid down my life for the sheep.',
            'My life is for the sheep.'
          ],
          note: 'τίθημι: -μι verb ("place / lay"). Long stem τιθη- in sg., short τιθε- in pl. ὑπέρ + gen. = "on behalf of".'
        },
        {
          g: 'ἵστησιν τὰ τέκνα ἐν μέσῳ τοῦ ὄχλου.',
          level: 1,
          en: 'He sets the children in the midst of the crowd.',
          choices: [
            'He sets the children in the midst of the crowd.',
            'He stands the children up against the crowd.',
            'The children stand in the midst of the crowd.',
            'He set the children in the midst of the crowd.'
          ],
          note: 'ἵστημι (transitive sense): "I cause to stand / set up". 3rd-sg. ἵστησιν has movable nu. ἐν μέσῳ + gen. = "in [the] midst of".'
        },
        {
          g: 'ἀγαπᾷ ὁ θεὸς τοὺς ἁμαρτωλούς.',
          level: 2,
          en: 'God loves the sinners.',
          choices: [
            'God loves the sinners.',
            'The sinners love God.',
            'God will love the sinners.',
            'God loved the sinners.'
          ],
          note: 'ἀγαπᾷ = α-contract: ἀγαπά-ει contracts to ἀγαπᾷ (3rd sg. pres. act.). The iota subscript is what survives of the -ει.'
        },
        {
          g: 'τότε ἀφῆκεν αὐτοῖς ὁ διδάσκαλος τὰς ἁμαρτίας.',
          level: 2,
          en: 'Then the teacher forgave them the sins.',
          choices: [
            'Then the teacher forgave them the sins.',
            'The teacher then will forgive them their sins.',
            'Then the sins forgave the teacher.',
            'The teacher then forgives sin to them.'
          ],
          note: 'ἀφῆκεν: aor. 3rd-sg. of ἀφίημι (compound of ἀπό + -ίημι). κ-aorist (like ἔδωκα) — typical of -μι verbs.'
        },
        {
          g: 'μενοῦμεν ἐν τῇ ἀγάπῃ τοῦ θεοῦ.',
          level: 2,
          en: 'We will remain in the love of God.',
          choices: [
            'We will remain in the love of God.',
            'We remain in the love of God.',
            'We remained in the love of God.',
            'We have remained in the love of God.'
          ],
          note: 'μενοῦμεν: liquid future of μένω (no σ; circumflex on the contracted ending μεν-ε-ομεν → μενοῦμεν). Distinguish from pres. μένομεν.'
        },
        {
          g: 'ὁ Χριστὸς ἀνέστη ἐκ νεκρῶν, καὶ ἔδωκεν ζωὴν τοῖς ἀνθρώποις.',
          level: 3,
          en: 'Christ rose from the dead and gave life to people.',
          choices: [
            'Christ rose from the dead and gave life to people.',
            'Christ stood up the people from the dead.',
            'Christ will rise from the dead and give life.',
            'From the dead, the people gave life to Christ.'
          ],
          note: 'Two -μι aorists: ἀνέστη (athematic 2nd aorist of ἀνίστημι, "rise") and ἔδωκεν (κ-aorist of δίδωμι). νεκρῶν is gen. pl. of the substantive adjective νεκροί ("the dead").'
        },
        {
          g: 'ἐδίδου αὐτοῖς ὁ ἀπόστολος ἐξουσίαν θεραπεύειν τοὺς ἀσθενεῖς.',
          level: 3,
          en: 'The apostle was giving them authority to heal the sick.',
          choices: [
            'The apostle was giving them authority to heal the sick.',
            'The apostle gave them authority over the sick.',
            'They were giving the apostle authority to heal the sick.',
            'The apostle\'s authority healed the sick.'
          ],
          note: 'ἐδίδου: imperfect 3rd-sg. of δίδωμι (short stem διδο-). ἐξουσίαν + complementary inf. (θεραπεύειν, pres. act. inf.).'
        },
        {
          g: 'οὐδεὶς ἐλήλυθεν πρὸς τὸν πατέρα εἰ μὴ διὰ τοῦ υἱοῦ ὃν ἀπέστειλεν.',
          level: 3,
          en: 'No one has come to the Father except through the Son whom he sent.',
          choices: [
            'No one has come to the Father except through the Son whom he sent.',
            'No one comes to the Father except by means of the sending of the Son.',
            'The Father has sent no one to himself except through the Son.',
            'The Son alone has come to the Father, having been sent.'
          ],
          note: 'εἰ μή = "except". ἐλήλυθεν: perfect of ἔρχομαι (suppletive). ἀπέστειλεν: liquid aor. of ἀποστέλλω (no σ; stem-vowel change).'
        }
      ]
    },

    20: {
      sentences: [
        {
          g: 'μείζων ὁ προφήτης τοῦ λαοῦ.',
          level: 1,
          en: 'The prophet is greater than the people.',
          choices: [
            'The prophet is greater than the people.',
            'The prophet of the people is great.',
            'The prophet is the greatest of the people.',
            'The people are greater than the prophet.'
          ],
          note: 'Comparative adj. (μείζων) + genitive of comparison: "greater than X". Predicate position; εἰμί is implied.'
        },
        {
          g: 'εἷς ὁ θεός, μία ἡ πίστις.',
          level: 1,
          en: 'There is one God, one faith.',
          choices: [
            'There is one God, one faith.',
            'God is the first; faith is the first.',
            'One God has one faith.',
            'God is one and faith is one.'
          ],
          note: 'εἷς (masc.) and μία (fem.) — two forms of the irregular numeral "one". Predicate position with εἰμί implied.'
        },
        {
          g: 'εἰ τις θέλει εἶναι πρῶτος, ἔσται διάκονος πάντων.',
          level: 1,
          en: 'If anyone wants to be first, he will be servant of all.',
          choices: [
            'If anyone wants to be first, he will be servant of all.',
            'Whoever is first wants to serve everyone.',
            'If someone serves all, he will want to be first.',
            'If anyone is a servant, he wants to be first.'
          ],
          note: 'τις (indefinite, enclitic = "anyone"). πρῶτος = ordinal "first". Future ἔσται. Genitive of comparison πάντων ("of all").'
        },
        {
          g: 'οὐδεὶς μείζων τοῦ διδασκάλου αὐτοῦ ἐστιν.',
          level: 2,
          en: 'No one is greater than his teacher.',
          choices: [
            'No one is greater than his teacher.',
            'Everyone is greater than his teacher.',
            'His teacher is no one’s greater.',
            'He has no greater teacher.'
          ],
          note: 'οὐδείς = "no one"; same genitive of comparison construction.'
        },
        {
          g: 'ἐὰν αἰτῇς τι παρὰ τοῦ πατρός, δώσει σοι.',
          level: 2,
          en: 'If you ask anything from the Father, he will give [it] to you.',
          choices: [
            'If you ask anything from the Father, he will give [it] to you.',
            'If anything is asked of the Father, you give to him.',
            'If you ask, the Father will give the thing.',
            'Whoever asks the Father will not give to you.'
          ],
          note: 'τι (indef. enclitic, neut. acc., unaccented) — distinguish from interrogative τί (always accented). δώσει: future of δίδωμι.'
        },
        {
          g: 'ἑαυτὸν οὐ δοξάζει ἀλλὰ τὸν πέμψαντα αὐτόν.',
          level: 2,
          en: 'He glorifies not himself but the one having sent him.',
          choices: [
            'He glorifies not himself but the one having sent him.',
            'The one who sent him does not glorify himself.',
            'He sent himself, not the one glorifying him.',
            'He sent himself in order to be glorified.'
          ],
          note: 'ἑαυτόν: reflexive pronoun (acc., 3rd-pers.). Aor. ptcp. τὸν πέμψαντα is substantival ("the one who sent").'
        },
        {
          g: 'ὁ ποιμὴν ὁ καλὸς τὴν ψυχὴν αὐτοῦ τίθησιν ὑπὲρ τῶν προβάτων.',
          level: 3,
          en: 'The good shepherd lays down his life for the sheep.',
          choices: [
            'The good shepherd lays down his life for the sheep.',
            'The shepherd is good, and his life is for the sheep.',
            'The good sheep give their lives for the shepherd.',
            'The shepherd places the good life on the sheep.'
          ],
          note: 'ποιμήν: 3rd-decl. (gen. ποιμένος). τίθησιν: -μι verb 3rd sg. ὑπέρ + gen. = "on behalf of". Article-noun-article-adj is the second attributive position.'
        },
        {
          g: 'εἰ ἦτε ἐκ τοῦ κόσμου, ὁ κόσμος ἂν ἐφίλει τὸ ἴδιον.',
          level: 3,
          en: 'If you were of the world, the world would love its own.',
          choices: [
            'If you were of the world, the world would love its own.',
            'If you are of the world, the world loves its own.',
            'When you were of the world, the world loved you.',
            'Although you are of the world, the world does not love its own.'
          ],
          note: 'Contrary-to-fact (2nd-class) condition: εἰ + impf. ind. (ἦτε), apodosis with ἄν + impf. ind. (ἐφίλει). τὸ ἴδιον = substantival adjective ("its own [thing]").'
        },
        {
          g: 'ὁ μείζων ἐν ὑμῖν γενέσθω ὡς ὁ νεώτερος, καὶ ὁ ἡγούμενος ὡς ὁ διακονῶν.',
          level: 3,
          en: 'Let the greater among you become as the younger, and the one leading as the one serving.',
          choices: [
            'Let the greater among you become as the younger, and the one leading as the one serving.',
            'The greater among you becomes the youngest who leads and serves.',
            'Whoever is greater serves the younger and leads.',
            'The leader and servant become greater than the younger one.'
          ],
          note: 'γενέσθω: 3rd-sg. aor. mid. imperative of γίνομαι ("let him become"). Two comparatives substantivally (ὁ μείζων, ὁ νεώτερος). ὁ ἡγούμενος / ὁ διακονῶν: substantival pres. ptcps.'
        }
      ]
    }
  };

  // ── Literal English translations for selected SBL verses ──────────
  // Keyed by the same `r` field used in READER_CHAPTERS. Only a subset
  // of verses get a translation MCQ — the iconic, short, or
  // high-instructional-value ones.
  const READER_VERSE_TRANSLATIONS = {
    'Mk 1:1': {
      en: '[The] beginning of the gospel of Jesus Christ.',
      choices: [
        '[The] beginning of the gospel of Jesus Christ.',
        'Jesus Christ began the gospel.',
        'The gospel of the beginning of Jesus is Christ.',
        '[The] beginning of Jesus is the gospel of Christ.'
      ],
      note: 'No verb — a verbless headline. Successive genitives: τοῦ εὐαγγελίου modifies Ἀρχή; Ἰησοῦ χριστοῦ modifies τοῦ εὐαγγελίου.'
    },
    'Jn 5:41': {
      en: 'I do not receive glory from people.',
      choices: [
        'I do not receive glory from people.',
        'Glory does not come to me from people.',
        'I do not give glory to people.',
        'I receive no glory; people [glorify] me.'
      ],
      note: 'παρά + gen. = "from (alongside)". Object δόξαν fronted before the verb for emphasis.'
    },
    'Lk 6:5': {
      en: 'Lord of the Sabbath is the Son of Man.',
      choices: [
        'Lord of the Sabbath is the Son of Man.',
        'The Son of Man is on the Sabbath of the Lord.',
        '[The] Sabbath is the Lord of the Son of Man.',
        'On the Sabbath the Lord is the Son of Man.'
      ],
      note: 'Predicate noun Κύριος (without the article) is fronted; ὁ υἱός is the subject (with article).'
    },
    'Jn 1:1': {
      en: 'In [the] beginning was the Word, and the Word was with God, and the Word was God.',
      choices: [
        'In [the] beginning was the Word, and the Word was with God, and the Word was God.',
        'The beginning of the Word is God, and God is with the Word.',
        'In the beginning the Word was God, and God was with him.',
        '[The] beginning was God, and the Word was with God.'
      ],
      note: 'Three clauses, all linking with ἦν (3rd sg. imperfect of εἰμί). In the third, anarthrous θεός is predicate, ὁ λόγος is subject (Colwell-style word order).'
    },
    'Mk 3:15': {
      en: '...and to have authority to cast out the demons.',
      choices: [
        '...and to have authority to cast out the demons.',
        '...and the authority cast out the demons.',
        '...and to cast out the authority of demons.',
        '...and the demons had authority to cast [them] out.'
      ],
      note: 'Two stacked infinitives: ἔχειν ("to have") + ἐξουσίαν + a complementary infinitive ἐκβάλλειν ("to cast out").'
    },
    'Jn 1:11': {
      en: 'He came to his own [things / people], and his own did not receive him.',
      choices: [
        'He came to his own [things / people], and his own did not receive him.',
        'He came to his own things, but he did not receive his own.',
        'His own came to him, and he did not receive his own.',
        'He went to his own; his own ones brought him in.'
      ],
      note: 'τὰ ἴδια (neut. pl.) and οἱ ἴδιοι (masc. pl.) — substantival adjectives; the shift from neuter to masculine narrows from "his own things / domain" to "his own people".'
    },
    'Mt 11:14': {
      en: 'And if you are willing to accept [it], he is Elijah, the one about to come.',
      choices: [
        'And if you are willing to accept [it], he is Elijah, the one about to come.',
        'If you wish to accept Elijah, he is about to come.',
        'And if you accept that he is Elijah, he comes to you.',
        'Are you willing to accept Elijah? He is the one who came.'
      ],
      note: 'εἰ + indicative = simple condition. ὁ μέλλων ἔρχεσθαι = articular present participle ("the one about to …") + complementary infinitive.'
    },
    'Jn 6:47': {
      en: 'Truly truly I say to you, the one who believes has eternal life.',
      choices: [
        'Truly truly I say to you, the one who believes has eternal life.',
        'Truly I say to you, you have life by believing.',
        'Truly truly I say to you, you who believe have eternal life.',
        'I say to you truly, the believer is the eternal life.'
      ],
      note: 'ὁ πιστεύων: articular present participle, substantival ("the one who believes"). ζωὴν αἰώνιον: adjective in attributive position with the noun.'
    },
    'Jn 6:48': {
      en: 'I am the bread of life.',
      choices: [
        'I am the bread of life.',
        'The bread of life is for me.',
        'I have the bread of life.',
        'Life is bread for me.'
      ],
      note: 'Iconic ἐγώ εἰμί + predicate noun (ὁ ἄρτος) + descriptive genitive (τῆς ζωῆς).'
    },
    'Mk 13:31': {
      en: 'Heaven and earth will pass away, but my words will certainly not pass away.',
      choices: [
        'Heaven and earth will pass away, but my words will certainly not pass away.',
        'Heaven and earth pass away, but my words pass through.',
        'Heaven and earth shall pass beside, and my words shall pass beside.',
        'Heaven and earth will pass away with my words; they will not pass.'
      ],
      note: 'οὐ μή + future / aorist subjunctive = emphatic negation ("certainly not"). δέ ("but") is postpositive.'
    },
    'Mt 14:4': {
      en: 'For John was saying to him, "It is not lawful for you to have her."',
      choices: [
        'For John was saying to him, "It is not lawful for you to have her."',
        'For John told him, "She is not allowed to have you."',
        'John used to say to him that he should have her.',
        'For John was saying to him, "You are allowed to have her."'
      ],
      note: 'ἔλεγεν: imperfect ("was saying / used to say"). Impersonal ἔξεστιν + dative-of-reference (σοι) + complementary infinitive (ἔχειν).'
    },
    'Jn 4:26': {
      en: 'Jesus says to her, "I am [he], the one speaking to you."',
      choices: [
        'Jesus says to her, "I am [he], the one speaking to you."',
        'Jesus told her, "I was the one who spoke to you."',
        'Jesus says to her, "I speak to the one who is."',
        'Jesus says to her, "Speak to me; I am here."'
      ],
      note: 'Historical present (λέγει). ὁ λαλῶν σοι: articular present participle in apposition with the implied predicate of Ἐγώ εἰμι.'
    },
    'Jn 8:50': {
      en: 'But I do not seek my [own] glory; there is one who seeks and judges.',
      choices: [
        'But I do not seek my [own] glory; there is one who seeks and judges.',
        'I do not seek glory; the seeker is the judge.',
        'I seek my own glory; there is one who judges.',
        'My glory does not seek; one judges and seeks.'
      ],
      note: 'Emphatic ἐγώ. δέ postpositive. τὴν δόξαν μου: possessive μου attached to the noun phrase. ὁ ζητῶν καὶ κρίνων: two participles sharing one article.'
    },
    'Lk 21:33': {
      en: 'Heaven and earth will pass away, but my words will certainly not pass away.',
      choices: [
        'Heaven and earth will pass away, but my words will certainly not pass away.',
        'Heaven and earth shall pass aside, and my words shall pass aside.',
        'Heaven and earth pass away with my words; they will not pass.',
        'Heaven and earth, but not my words, will pass away.'
      ],
      note: 'Same construction as Mk 13:31. Note the οὐ μή + the future / subj. emphatic negation.'
    },
    'Php 4:4': {
      en: 'Rejoice in [the] Lord always; again I will say, rejoice.',
      choices: [
        'Rejoice in [the] Lord always; again I will say, rejoice.',
        'Rejoice in the Lord; I will not say it again — rejoice.',
        'You rejoice in the Lord at all times; I say it again, rejoice.',
        'Rejoice in the Lord; once more I have said, rejoice.'
      ],
      note: 'Χαίρετε is 2nd-pl. present imperative. πάντοτε = "always". ἐρῶ is the future of λέγω ("I will say").'
    },
    '1Th 5:16': {
      en: 'Rejoice always.',
      choices: [
        'Rejoice always.',
        'Always you rejoice.',
        'You will rejoice always.',
        'Rejoicing always [is good].'
      ],
      note: 'Two-word imperative clause: present imperative + adverb. The present aspect signals continuous / habitual action.'
    },
    '1Th 5:25': {
      en: 'Brothers, pray concerning us.',
      choices: [
        'Brothers, pray concerning us.',
        'Brothers, we pray concerning you.',
        'Brothers, you pray and we will too.',
        'Brothers concerning us pray.'
      ],
      note: 'Vocative Ἀδελφοί + present mid./pass. imperative προσεύχεσθε + περί + gen.'
    }
  };

  // Best-effort attachment to existing READER_CHAPTERS so the renderer
  // can find translations on each verse via verse.literal lookup. Both
  // the curated MCQ-style entries (READER_VERSE_TRANSLATIONS, kept for
  // backward compatibility) and the comprehensive plain-string map
  // (READER_VERSE_LITERALS) are merged here. The renderer treats string
  // values as a literal-translation tap-to-reveal payload.
  function attachToReaderChapters() {
    if (!Array.isArray(window.READER_CHAPTERS)) return;
    const literalsMap = (window.READER_VERSE_LITERALS && typeof window.READER_VERSE_LITERALS === 'object')
      ? window.READER_VERSE_LITERALS
      : {};
    window.READER_CHAPTERS.forEach((ch) => {
      if (!ch || !Array.isArray(ch.verses)) return;
      ch.verses.forEach((verse) => {
        if (!verse || verse.literal) return;
        const ref = verse.r;
        if (!ref) return;
        const curated = READER_VERSE_TRANSLATIONS[ref];
        if (curated) {
          verse.literal = curated;
          return;
        }
        const plain = literalsMap[ref];
        if (plain) {
          verse.literal = plain;
        }
      });
    });
  }

  window.READER_TRANSLATION_SETS = READER_TRANSLATION_SETS;
  window.READER_VERSE_TRANSLATIONS = READER_VERSE_TRANSLATIONS;
  attachToReaderChapters();
  // Re-run after the literals data file loads, in case load order differs.
  if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', attachToReaderChapters);
  }
})();
