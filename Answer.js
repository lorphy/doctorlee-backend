import mongoose from 'mongoose';
const {Schema,model} = mongoose;
const answerSchema = new Schema({
  updated: { type: Date, default: Date.now },
  personalInfo:{
      name: String,
      gender: {type:String,enum:['male','female'],required:true},
      age: { type: Number, min: 0, max: 150 },
      email: String
  },
  medicalHistory:{
    currentSymptoms: String,
    symptomDuration: String,
    previousTreatments: String,

    tumorHistory:String,
    illHistory:[],
    operationHistory:String,

    coldOrHot:{type:String,enum:['怕冷','怕热','手冷','足冷'],required:true},
    coldOrHotExtent:{type:String,enum:['很少','一般','中等','非常'],required:true},
    sweatOrNot:{type:String,enum:['有','无'],required:true},
    sweatExtent:{type:String,enum:['这几年基本不出汗','正常出汗','动辄出汗'],required:true},
    sweatTime:{type:String,enum:['早上','傍晚','夜晚'],required:true},
    sweatFearWind:{type:String,enum:['是','否'],required:true},
    sweatAmount:{type:String,enum:['很少','一般','很多'],required:true},

    snorkling:{type:String,enum:['多年','最近有','无'],required:true},
    noseStuff:{type:String,enum:['有','无'],required:true},
    inhalePalse:{type:String,enum:['有','无'],required:true},

    painPart:[],
    painExtent:{type:String,enum:['轻度','中度','重度','严重'],required:true},
    painKind:[],

    chestPain:{type:String,enum:['是','否'],required:true},
    bellyPain:{type:String,enum:['是','否'],required:true},
    bellyCold:{type:String,enum:['是','否'],required:true},
    bellyHeavy:{type:String,enum:['是','否'],required:true},
    waistFearCold:{type:String,enum:['是','否'],required:true},
    waistSour:{type:String,enum:['是','否'],required:true},
    waistHeavy:{type:String,enum:['是','否'],required:true},
    stomachFeeling:[],
    appetite:{type:String,enum:['差','一般','很好'],required:true},
    intake:{type:String,enum:['很少','一般','中等','很多'],required:true},
    intakePreference:{type:String,enum:['喜冷','喜热','偏甜','偏咸','偏辣'],required:true},

    mouthFeeling:{type:String,enum:['口干','口苦','口咸','口淡','仅晨起口苦','仅睡前口干'],required:true},
    drinking:{type:String,enum:['喜饮','不喜饮','喜冷饮','喜热饮'],required:true},
    throat:{type:String,enum:['咽干','咽痛','无'],required:true},
    phlegm:[],

    shitTimes:{ type: Number, min: 0, max: 10 },
    shitShape:{type:String,enum:['正常','不成形','偏干','偏稀','先干后稀'],required:true},
    shitColor:String,
    peeMoreOrLess:{type:String,enum:['多','少'],required:true},
    peeSymptom:[],
    peeTimes:{ type: Number, min: 0, max: 10 },
    peeColor:String,
    
    panic:{type:String,enum:['有','无'],required:true},
    shortBreath:{type:String,enum:['有','无'],required:true},
    dryEye:{type:String,enum:['有','无'],required:true},
    easyAngry:{type:String,enum:['有','无'],required:true},
    recentCold:{type:String,enum:['有','无'],required:true},

    menstruationPeriod:{type:String,enum:['正常','提前','延后']},
    menstruationBlock:{type:String,enum:['有','无']},
    menstruationAmount:{type:String,enum:['正常','多','少']},
    menstruationPain:{type:String,enum:['有','无']},
    menstruationWhiteBelt:{type:String,enum:['有','无','多','少']},
    menstruationWhiteBeltColor:{type:String,enum:['黄','白','赤']},
    menstruationOdor:{type:String,enum:['正常','腥','臭']},
    menstruationColor:String
  },
  lifestyleInfo:{
    occupation: String,
    smokingStatus: {type:String,enum:['从不','偶尔','常年'],requird:true},
    drinkingStatus: {type:String,enum:['从不','偶尔','常年'],requird:true},
    exerciseFrequency: {type:String,enum:['从不','偶尔','每周','每天'],requird:true},
    sleepHours: Number,
    fearCold: { type: Number, min: 0, max: 10 },
    weight: Number,
    height: Number,
    fearHot: { type: Number, min: 0, max: 10 },
    fearWind: { type: Number, min: 0, max: 10 },
    additionalNotes: String,
    sleepQuality:[]    
  }
});

const Answer =  model('Answer',answerSchema);
export default Answer;

