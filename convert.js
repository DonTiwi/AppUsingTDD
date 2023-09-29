const conversionFactors = {
    mm: 25.4,
    cm: 2.54,
    m: 0.0254
};

function convert(inches, unit) {
    if (!conversionFactors[unit]) {
        throw new Error('Invalid conversion unit');
    }
    return `${inches * conversionFactors[unit]} ${unit}`;
}

function performConversion() {
    const inchesInput = document.getElementById('inchesInput');
    const unitSelect = document.getElementById('unitSelect');
    const output = document.getElementById('output');

    const inches = parseFloat(inchesInput.value);
    const unit = unitSelect.value.slice(1);  // Removing '-' prefix

    try {
        output.textContent = convert(inches, unit);
    } catch (error) {
        output.textContent = error.message;
    }
}

function almostEqual(val1, val2, epsilon = 0.00001) {
    return Math.abs(val1 - val2) < epsilon;
}

// If Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    const assert = require('assert');

    function runTests() {
        if (!almostEqual(parseFloat(convert(39.37, 'm')), 1)) {
            throw new Error(`Expected ${convert(39.37, 'm')} to be close to 1 m`);
        }

        assert.strictEqual(convert(1, 'mm'), '25.4 mm');
        assert.strictEqual(convert(2, 'mm'), '50.8 mm');
        assert.strictEqual(convert(1, 'cm'), '2.54 cm');
        assert.strictEqual(convert(2, 'cm'), '5.08 cm');
        assert.strictEqual(convert(1, 'm'), '0.0254 m');
        console.log('All tests passed');
    }

    function handleCommandLine() {
        const args = process.argv.slice(2);
        if (args.includes('-t')) {
            runTests();
        } else {
            const inches = parseFloat(args[0]);
            const unit = args[1].slice(1);  // Removing '-' prefix
            try {
                console.log(convert(inches, unit));
            } catch (error) {
                console.error(error.message);
            }
        }
    }

    handleCommandLine();
}

// If browser environment
if (typeof window !== 'undefined') {
    window.onload = () => {
        const convertButton = document.getElementById('convertButton');
        convertButton.addEventListener('click', performConversion);
    };
}
