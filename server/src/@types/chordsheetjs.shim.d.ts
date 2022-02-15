// import * as chordsheetjs from 'chordsheetjs';
import * as chordsheetjs from 'chordsheetjs'

declare module 'chordsheetjs' {
    /**
     * Parses an Ultimate Guitar chord sheet with metadata
     * Inherits from {@link ChordSheetParser}
     */
    class UltimateGuitarParser extends chordsheetjs.ChordSheetParser {
        // parseLine(line) {
        //     if (this.isSectionEnd()) {
        //         this.endSection();
        //     }

        //     if (VERSE_LINE_REGEX.test(line)) {
        //         this.startNewLine();
        //         this.startSection(VERSE);
        //     } else if (CHORUS_LINE_REGEX.test(line)) {
        //         this.startNewLine();
        //         this.startSection(CHORUS);
        //     } else if (OTHER_METADATA_LINE_REGEX.test(line)) {
        //         this.startNewLine();
        //         this.endSection();
        //         const comment = line.match(OTHER_METADATA_LINE_REGEX)[1];
        //         this.songLine.addTag(new Tag(COMMENT, comment));
        //     } else {
        //         super.parseLine(line);
        //     }
        // }

        // isSectionEnd() {
        //     return this.songLine && this.songLine.isEmpty() && this.song.previousLine && !this.song.previousLine.isEmpty();
        // }

        // endOfSong() {
        //     super.endOfSong();
        //     if (this.currentSectionType in endSectionTags) {
        //         this.startNewLine();
        //     }
        //     this.endSection({ addNewLine: false });
        // }

        // startSection(sectionType) {
        //     if (this.currentSectionType) {
        //         this.endSection();
        //     }

        //     this.currentSectionType = sectionType;
        //     this.song.setCurrentLineType(sectionType);

        //     if (sectionType in startSectionTags) {
        //         this.song.addTag(new Tag(startSectionTags[sectionType]));
        //     }
        // }

        // endSection({ addNewLine = true } = {}) {
        //     if (this.currentSectionType in endSectionTags) {
        //         this.song.addTag(new Tag(endSectionTags[this.currentSectionType]));

        //         if (addNewLine) {
        //             this.startNewLine();
        //         }
        //     }

        //     this.song.setCurrentLineType(NONE);
        //     this.currentSectionType = null;
        // }

        // startNewLine() {
        //     this.songLine = this.song.addLine();
        // }
    }

    class Chord {
        static parse(chordString: string): Chord | null;

        /**
         * Returns a deep copy of the chord
         * @returns {Chord}
         */
        clone(): Chord;

        /**
         * Converts the chord to a chord symbol, using the supplied key as a reference.
         * For example, a numeric chord `#4` with reference key `E` will return the chord symbol `A#`.
         * When the chord is already a chord symbol, it will return a clone of the object.
         * @param {Key|string} key the reference key
         * @returns {Chord} the chord symbol
         */
        toChordSymbol(key: Key): Chord;

        /**
         * Converts the chord to a chord symbol string, using the supplied key as a reference.
         * For example, a numeric chord `#4` with reference key `E` will return the chord symbol `A#`.
         * When the chord is already a chord symbol, it will return a string version of the chord.
         * @param {Key|string} key the reference key
         * @returns {string} the chord symbol string
         * @see {toChordSymbol}
         */
        toChordSymbolString(key: Key | string): string;

        /**
         * Determines whether the chord is a chord symbol
         * @returns {boolean}
         */
        isChordSymbol(): boolean;

        /**
         * Converts the chord to a numeric chord, using the supplied kye as a reference.
         * For example, a chord symbol A# with reference key E will return the numeric chord #4.
         * @param {Key|string} key the reference key
         * @returns {Chord} the numeric chord
         */
        toNumeric(key: Key | string): Chord;

        /**
         * Determines whether the chord is numeric
         * @returns {boolean}
         */
        isNumeric(): boolean;

        /**
         * Converts the chord to a numeric chord string, using the supplied kye as a reference.
         * For example, a chord symbol A# with reference key E will return the numeric chord #4.
         * @param {Key|string} key the reference key
         * @returns {string} the numeric chord string
         * @see {toNumeric}
         */
        toNumericString(key: Key | string): string;

        /**
         * Converts the chord to a string, eg `Esus4/G#` or `1sus4/#3`
         * @returns {string} the chord string
         */
        toString(): string;

        /**
         * Normalizes the chord:
         * - Fb becomes E
         * - Cb becomes B
         * - B# becomes C
         * - E# becomes F
         * - 4b becomes 3
         * - 1b becomes 7
         * - 7# becomes 1
         * - 3# becomes 4
         *
         * If the chord is already normalized, this will return a copy.
         * @returns {Chord} the normalized chord
         */
        normalize(): Chord;

        /**
         * Switches to the specified modifier
         * @param newModifier the modifier to use: `'#'` or `'b'`
         * @returns {Chord} the new, changed chord
         */
        useModifier(newModifier: '#' | 'b'): Chord;

        /**
         * Transposes the chord up by 1 semitone. Eg. A becomes A#, Eb becomes E
         * @returns {Chord} the new, transposed chord
         */
        transposeUp(): Chord;

        /**
         * Transposes the chord down by 1 semitone. Eg. A# becomes A, E becomes Eb
         * @returns {Chord} the new, transposed chord
         */
        transposeDown(): Chord;

        /**
         * Transposes the chord by the specified number of semitones
         * @param delta de number of semitones
         * @returns {Chord} the new, transposed chord
         */
        transpose(delta: number): Chord;

        root: Chord;
        bass: Key | null;

        constructor(
            {
                base = null,
                modifier = null,
                suffix = null,
                bassBase = null,
                bassModifier = null,
                root = null,
                bass = null,
            }: {
                base: Key| null;
                modifier: "#"|"b"|null;
                suffix: 'M'|'m'|'dim'|null;
                bassBase: string | Note | null;
                bassModifier: "#"|"b"|null;
                root: Key | null;
                bass: Key | null;
            },
        );

        set(properties: object): Chord;

        // get #rootNote(): Note;

        // #process(func, arg = null) {
        //     return this.set({
        //         root: this.root[func](arg),
        //         bass: this.bass ? this.bass[func](arg) : null,
        //     });
        // }

        // #is(type) {
        //     return this.root.is(type) && (!this.bass || this.bass.is(type));
        // }
    };

    class Key {
        static parse(keyString: string): Key | null;

        static wrap(keyStringOrObject: string | Key): Key | null;

        static distance(oneKey: string | Key, otherKey: string | Key): number;

        distanceTo(otherKey: string | Key): number;

        note: Note;
        modifier: "#"|"b"|null;

        constructor({ note, modifier = null }: {note: Note | string, modifier: "#"|"b"|null});

        #set(attributes: object): Key;

        clone(): Key;

        toChordSymbol(key: Key): Key;

        toChordSymbolString(key: Key): string;

        is(type: "SYMBOL"|"NUMERIC"): boolean;

        isNumeric(): boolean;

        isChordSymbol(): boolean;

        toNumeric(key: Key): Key;

        equals({ note, modifier }: {note: Note, modifier:"#" | "b" | null}): boolean;

        toNumericString(key: Key): string;

        toString(): string;

        transpose(delta: number): Key;

        transposeUp(): Key;

        transposeDown(): Key;

        useModifier(newModifier: '#'|'b'): Key;

        normalize(): Key;
    };

    class Note {
        type: "SYMBOL"|"NUMERIC";
        note: string | number;
        constructor(note: string);
      
        equals(otherNote: Note): boolean;
      
        clone(): Note;
      
        up(): Note;
      
        down(): Note;
      
        isOneOf(...options: (string|number)[]): boolean;
      
        isNumeric(): boolean;
      
        isChordSymbol(): boolean;
      
        is(noteType: "SYMBOL" | "NUMERIC"): boolean;
      
        getTransposeDistance(): null | number;
      
        change(delta: number): Note;
      
        toString(): string;
    };

}