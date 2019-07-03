package sdl

// StreamDef has data about a stream defined in a schema
type StreamDef struct {
	Name      string
	TypeName  string
	KeyFields []string
	External  bool
	Compiler  *Compiler
}
