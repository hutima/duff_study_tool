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
  // can find translations on each verse via card.literal lookup.
  function attachToReaderChapters() {
    if (!Array.isArray(window.READER_CHAPTERS)) return;
    window.READER_CHAPTERS.forEach((ch) => {
      if (!ch || !Array.isArray(ch.verses)) return;
      ch.verses.forEach((verse) => {
        const ref = verse && verse.r;
        const extra = ref && READER_VERSE_TRANSLATIONS[ref];
        if (extra && !verse.literal) {
          verse.literal = extra;
        }
      });
    });
  }

  window.READER_TRANSLATION_SETS = READER_TRANSLATION_SETS;
  window.READER_VERSE_TRANSLATIONS = READER_VERSE_TRANSLATIONS;
  attachToReaderChapters();
})();
