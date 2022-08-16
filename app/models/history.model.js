module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      id: { type: Number, default: 0 },
      location: String,
      date: String,
      time: String
    }, { timestamps: true } // create itself
  );

  // _id - auto increment
  const AutoIncrement = require("mongoose-sequence")(mongoose);
  schema.plugin(AutoIncrement, { inc_field: "id" });
  
  const History = mongoose.model('history', schema);
  return History;
}
