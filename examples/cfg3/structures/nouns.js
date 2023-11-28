const singularNouns = [
                "abacus|abandon|ability|abnormality|abortion|abrasion|absence|absorption|abuse|academy",
                "accident|accommodation|accompaniment|achievement|acid|acorn|acoustic|acquaintance|acquisition",
                "acre|acrobat|acrylic|act|action|actor|actress|acupuncture|ad|adapter",
                "addition|address|adjective|adjunct|admiral|adolescent|adult|advantage|adverb|advertisement",
                "advice|affair|affair|affection|affidavit|affiliation|afternoon|aftershock|afterthought|afterword",
                "age|agenda|agent|agony|agreement|agriculture|air|airplane|airport|airship",
                "alarm|alarm|alcohol|alchemist|alcove|alder|alderman|algebra|algorithm|alien",
                "alkali|alkane|alkene|alkyne|alligator|alley|alliance|alloy|almanac|aloe",
                "alphabet|alphaphysics|ambition|ambulance|ambush|amethyst|amnesia|amnesty|amusement|amusement park",
                "analogy|analysis|analyst|ancestor|anchorage|anchorman|anchovy|android|anecdote|anemia",
                "anesthesiologist|angel|angel|anger|angle|angle|angle|angle|animal|ankle",
                "anniversary|announcement|answer|answer|ant|antenna|anthem|anthology|anthropologist|anthropology",
                "antibody|antidote|anxiety|anxiety|apartment|apocalypse|apology|apostle|apparatus|appeal",
                "appearance|applause|appliance|apple|application|appointment|appreciation|apprentice|apron|aquarium",
                "aqueduct|archer|archipelago|architect|architecture|archive|area|arena|argument|arm",
                "armada|armature|armchair|armrest|army|army|aroma|aroma|arrangement|arrest",
                "arrow|arson|artery|arthritis|artifact|artist|artwork|ascent|ash|asphalt",
                "aspirin|assassination|assault|assembly|assessment|asset|assistant|associate|association|asteroid",
                "asthma|athlete|atmosphere|atom|atomizer|atonement|attached|attachment|attempt|attention",
                "attorney|auction|audacious|audacity|audience|audit|auditor|aunt|author|authority",
                "authorization|automobile|automobile|autonomy|autumn|auxiliary|avalanche|average|award|awareness"
            ];
    
const pluralNouns = [
                "abacuses|abandons|abilities|abnormalities|abortions|abrasions|absences|absorptions|abuses|academies",
                "accidents|accommodations|accompaniments|achievements|acids|acorns|acoustics|acquaintances|acquisitions",
                "acres|acrobats|acrylics|acts|actions|actors|actresses|acupunctures|ads|adapters",
                "additions|addresses|adjectives|adjuncts|admirals|adolescents|adults|advantages|adverbs|advertisements",
                "advices|affairs|affections|affidavits|affiliations|afternoons|aftershocks|afterthoughts|afterwords",
                "ages|agendas|agents|agonies|agreements|agricultures|airs|airplanes|airports|airships",
                "alarms|alcohols|alchemists|alcoves|alders|aldermans|algebras|algorithms|aliens|alkalis",
                "alkanes|alkenes|alkynes|alligators|alleys|alliances|alloys|almanacs|aloe",
                "alphabets|alphaphysics|ambitions|ambulances|ambushes|amethysts|amnesias|amnesties|amusements|amusement parks",
                "analogies|analyses|analysts|ancestors|anchorages|anchormans|anchovies|androids|anecdotes|anemia",
                "anesthesiologists|angels|angers|angles|animals|ankles|anniversaries|announcements|answers|ants",
                "antennas|anthems|anthologies|anthropologists|anthropologies|antibodies|antidotes|anxieties|apartments",
                "apocalypses|apologies|apostles|apparatuses|appeals|appearances|applauses|appliances|apples|applications",
                "appointments|appreciations|apprentices|aprons|aquaria|aqueducts|archers|archipelagos|architects|architectures",
                "archives|areas|arenas|arguments|arms|armadas|armatures|armchairs|armrests|armies",
                "aromas|arrangements|arrests|arrows|arsons|arteries|arthritides|artifacts|artists|artworks",
                "ascents|ashes|asphalts|aspirins|assassinations|assaults|assemblies|assessments|assets|assistants",
                "associates|associations|asteroids|asthmas|athletes|atmospheres|atoms|atomizers|atonements",
                "attaches|attachments|attempts|attentions|attorneys|auctions|audacities|auditoriums|audits|auditors",
                "aunts|authors|authorities|authorizations|automobiles|autonomies|autumns|auxiliaries|avalanches|averages"
];   

const properNouns = [
  "'Acropolis'|'Adriatic Sea'|'Africa'|'Aladdin'|'Alaska'|'Amazon River'|'American Revolution'|'Andes Mountains'|'Andromeda Galaxy'|'Antarctica'",
  "'Arabian Peninsula'|'Arctic Ocean'|'Aristotle'|'Atlantic Ocean'|'Atlas Mountains'|'Augustine of Hippo'|'Auschwitz Concentration Camp'|'Austen, Jane'|'Australian Alps'|'Babylonian Empire'",
  "'Bali'|'Beijing'|'Berlin'|'Bible'|'Big Ben'|'Black Death'|'Black Sea'|'Buddha'|'Buenos Aires'|'Cairo'",
  "'California'|'Canada'|'Canterbury Cathedral'|'Cartesian Coordinate System'|'Casablanca'|'Caspian Sea'|'Cathedral of Notre Dame'|'Catherine the Great'|'Caucasus Mountains'|'Celsius'",
  "'Central America'|'Charles Darwin'|'Charlie Chaplin'|'Chaucer, Geoffrey'|'Che Guevara'|'Chicago'|'Chinese Revolution'|'Christ the Redeemer'|'Churchill, Winston'|'Civil War'",
  "'Cleopatra'|'Columbus, Christopher'|'Colosseum'|'Columbia'|'Constitution of the United States'|'Copenhagen'|'Cortez, Hernan'|'Cuba'|'Darwin, Charles'|'Declaration of Independence'",
  "'D-Day'|'Dead Sea'|'Delhi'|'Democratic Republic of the Congo'|'Denver'|'Detroit'|'Dinosaur National Monument'|'Dracula'|'Dracula'|'Egypt'",
  "'Einstein, Albert'|'El Dorado'|'Elizabeth I'|'Empire State Building'|'English Channel'|'Eiffel Tower'|'El Greco'|'Elvis Presley'|'Everest, Mount'|'Excalibur'",
  "'Fifty Shades of Grey'|'Florence'|'Florida'|'France'|'French Revolution'|'French Riviera'|'Gandhi, Mahatma'|'Ganges River'|'Gates, Bill'|'Gettysburg Address'",
  "'Ghostbusters'|'Golden Gate Bridge'|'Grand Canyon'|'Grand Teton National Park'|'Great Barrier Reef'|'Great Britain'|'Great Wall of China'|'Greece'|'Greek Revolution'|'Greenwich Mean Time'",
  "'Hamlet'|'Hannibal'|'Hawaii'|'Hawking, Stephen'|'Heineken'|'Hemingway, Ernest'|'Henry VIII'|'Hiroshima'|'Hitler, Adolf'|'Holocaust'",
  "'Hong Kong'|'Hoover Dam'|'House of Representatives'|'Hudson River'|'Human Genome Project'|'Hundred Years' War'|'Ice Age'|'India'|'Indian Ocean'|'Indonesia'",
  "'Internet'|'Iraq'|'Ireland'|'Iron Age'|'Islamic State of Iraq and Syria'|'Italy'|'Jackson, Michael'|'Japan'|'Java'|'Jerusalem'",
  "'Julius Caesar'|'Jupiter'|'Jurassic Park'|'Kennedy Space Center'|'Kenya'|'Kilimanjaro, Mount'|'King Arthur'|'King Kong'|'Korean War'|'Kremlin'",
  "'Lake Superior'|'Leonardo da Vinci'|'Liberty Bell'|'Lincoln, Abraham'|'London'|'Los Angeles'|'Louis XIV'|'Louvre'|'Luxembourg'|'Macbeth'",
  "'Madison Square Garden'|'Madonna'|'Magellan, Ferdinand'|'Magna Carta'|'Manhattan'|'Marathon'|'Mars'|'Mary Magdalene'|'Maya Civilization'|'Mediterranean Sea'",
  "'Middle Ages'|'Mona Lisa'|'Moscow'|'Mount Rushmore'|'Mozart'|'Muhammad'|'Mumbai'|'Munich'|'Mycenaean Civilization'|'Napoleon Bonaparte'",
  "'National Aeronautics and Space Administration (NASA)'|'Nelson Mandela'|'New Delhi'|'New Orleans'|'New York City'|'New Zealand'|'Niagara Falls'|'Nile River'|'North America'|'North Korea'",
  "'Notre Dame Cathedral'|'Pacific Ocean'|'Panama Canal'|'Paris'|'Pearl Harbor'|' Peloponnesian War'|'Persian Empire'|'Peru'|'Picasso, Pablo'|'Pilgrims'",
  "'Pink Floyd'|'Plato'|'Pompeii'|'Portugal'|'Pyramid of Giza'|'Queen Elizabeth II'|'Renaissance'|'Rhine River'|'Richard the Lionheart'|'Roman Empire'",
  "'Romeo and Juliet'|'Rome'|'Rubiks Cube'|'Russia'|'Saint Peters Basilica'|'San Francisco'|'Shakespeare, William'|'Shangri-La'|'Silk Road'|'Sinai Peninsula'",
  "'Sirius'|'Sistine Chapel'|'Sphinx'|'Statue of Liberty'|'Stonehenge'|'Supreme Court of the United States'|'Taj Mahal'|'Tammuz'|'Tasmania'|'Tet Offensive'",
  "'Titanic'|'Tokyo'|'Toronto'|'Tower of London'|'Trans-Siberian Railway'|'Troy'|'Truman, Harry S.'|'United Kingdom'|'United Nations'|'United States'",
  "'Venus'|'Versailles'|'Vietnam'|'Violin'|'Volkswagen'|'Voltaire'|'Washington, D.C.'|'Washington Monument'|'Watergate Scandal'|'Waterloo'",
  "'White House'|'World War I'|'World War II'|'Wright Brothers'|'Yellowstone National Park'|'Yosemite National Park'|'Zeus'|'Zorro'"
];

  

const nouns = {
    singular: singularNouns,
    plural: pluralNouns,
    proper: properNouns
}

export default nouns;