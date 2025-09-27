const uploadText=async(req,res)=>{
    const { message, context = 'sikkim_monasteries' } = req.body;
    try{
      const chat = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `You are a monastery tour guide specialized in Sikkim.` },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    const reply = chat.choices[0].message.content;
    res.json({ reply });
    }
    catch(err){
        res.status(500).send("Server Error");
    }
}

const uploadAudio=async(req,res)=>{
    try{
        // Transcribe with Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: 'whisper-1'
    });
    fs.unlinkSync(req.file.path);
    // Forward transcript to chat endpoint
    const chat = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `You are a monastery tour guide.` },
        { role: 'user', content: transcription.text }
      ]
    });
    res.json({ transcript: transcription.text, reply: chat.choices[0].message.content });
  } catch(err){
        res.status(500).json({ error: "Server Error" });
    }
}
const uploadImage=async(req,res)=>{
    try{
      // Use OpenAI Vision (if available) or a custom model
    const vision = await openai.images.analyze({
      file: fs.createReadStream(req.file.path),
      features: ['CAPTIONS']
    });
    fs.unlinkSync(req.file.path);
    const caption = vision.captions[0].text;
    const chat = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `You are a monastery tour guide.` },
        { role: 'user', content: `Describe and relate this image: ${caption}` }
      ]
    });
    res.json({ caption, reply: chat.choices[0].message.content });
    }
    catch(err){
        res.status(500).json({ error: "Server Error" });
    }
}
export { uploadText, uploadAudio, uploadImage };