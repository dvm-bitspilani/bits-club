
    export default function getClubData() {
    const clubData = {
    club_name: "ACM",
    club_description : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod
    odio a ipsum vehicula semper sed imperdiet nunc. Integer varius tortor
    vel mauris ultricies, vitae accumsan neque rutrum..Lorem ipsum dolor
    sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum
    vehicula semper sed imperdiet nunc. Integer varius tortor vel mauris
    ultricies, vitae accumsan neque rutrum..Lorem ipsum dolor sit amet,
    consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper
    sed imperdiet nunc. Integer varius tortor vel`,
    previousWork : [
      {image : "../assets/thumbnail3.png", 
      description : "1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc."},
      {image : "../assets/thumbnail3.png",
      description : "2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc."},
      {image : "../assets/thumbnail3.png",
      description : "3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc."},
      {image : "../assets/thumbnail3.png",
      description : "4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc."},
      {image : "../assets/thumbnail3.png",
      description : "5. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc."},
    ],
    skills_text : [
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque expedita blanditiis fugiat quam illum molestiae inventore unde, soluta perferendis dolores commodi?",
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque expedita blanditiis fugiat quam illum molestiae inventore unde, soluta perferendis dolores commodi?",
    ],
    club_tags : [
      "Coding Skills",
      "Angular",
      "Competitive Coding",
      "Video Editing",
    ],
    pors : [
      {name : "Siddharth", position : "President", image : "../assets/thumbnail3.png"},
      {name : "Siddharth", position : "Vice President", image : "../assets/thumbnail3.png"},
      {name : "Siddharth", position : "Oasis Coordinator", image : "../assets/thumbnail3.png"},
      {name : "Siddharth", position : "BOSM Coordinator", image : "../assets/thumbnail3.png"},
      {name : "Siddharth", position : "APOGEE Coordinator", image : "../assets/thumbnail3.png"},
    ]
  }

  return clubData;
}