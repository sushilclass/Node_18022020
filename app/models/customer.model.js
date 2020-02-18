// const mongoose = require('mongoose');

// const CustomerSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     FirstName: String,
//     LastName: String
// },{
//     timestamps: true
// });

// module.exports = mongoose.model('customers',CustomerSchema);

var ObjectParameter = {
    Name: String,
    GUID: String,
    BUILTIN: String,
    ParameterGroup: String,
    ParameterType: String,
    ParentElementUniqueId: String,    
    UnitType: String,
    Type: String,
    DisplayUnitType: String,
    HasValue: Boolean,
    Id: Number,
    IsReadOnly: Boolean,
    IsShared: Boolean,
    UserModifiable: Boolean,
    ValueDoubleInternalUnits: Number,    
    ValueDouble: Number, // double
    ValueDoubleIntegral: Number,
    ValueString: String,
    ValueAbbrev: String,
    ValueElementId: Number,    
    ValueInteger: Number // double
}

var ObjectTypeParameter = {
    Name: String,
    GUID: String,
    BUILTIN: String,
    ParameterGroup: String,
    ParameterType: String,
    ParentElementUniqueId: String,    
    UnitType: String,
    Type: String,
    DisplayUnitType: String,
    HasValue: Boolean,
    Id: Number,
    IsReadOnly: Boolean,
    IsShared: Boolean,
    UserModifiable: Boolean,
    ValueDoubleInternalUnits: Number,    
    ValueDouble: Number, // double
    ValueDoubleIntegral: Number,
    ValueString: String,
    ValueAbbrev: String,
    ValueElementId: Number,    
    ValueInteger: Number // double
}

var ObjectParameter2 = {
    Name: String,
    GUID: String,
    BUILTIN: String,
    ParameterGroup: String,
    ParameterType: String,
    ParentElementUniqueId: String,    
    UnitType: String,
    Type: String,
    DisplayUnitType: String,
    HasValue: Boolean,
    Id: Number,
    IsReadOnly: Boolean,
    IsShared: Boolean,
    UserModifiable: Boolean,
    ValueDoubleInternalUnits: Number,    
    ValueDouble: Number, // double
    ValueDoubleIntegral: Number,
    ValueString: String,
    ValueAbbrev: String,
    ValueElementId: Number,    
    ValueInteger: Number // double
}

var EStore = {

}

var ElectricalSystem = {
    has_init: Boolean,
    isCircuit: Boolean,
    List: ObjectParameter2,
    ObjectElectricalSystems: Object,
    ApparentCurrent: Number,
    ApparentCurrentPhaseA: Number,
    ApparentCurrentPhaseB: Number,
    ApparentCurrentPhaseC: Number,
    ApparentLoad: Number,
    ApparentLoadPhaseA: Number,
    ApparentLoadPhaseB: Number,
    ApparentLoadPhaseC: Number,
    BalancedLoad: Boolean,
    BaseEquipment: String,
    BaseEquipmentConnector: Number,
    Category: String,
    CircuitNumber: String,
    CircuitPathMode: String,
    CircuitType: String,
    GroundConductorsNumber: Number,
    HasCustomCircuitPath: Boolean,
    HasDesignParts: Boolean,
    HasFabricationParts: Boolean,
    HasPathOffset: Boolean,
    HasPlaceholders: Boolean,
    HotConductorsNumber: Number,
    Id: Number,
    IsEmpty: Boolean,
    IsMultipleNetwork: Boolean,
    IsTransient: Boolean,
    IsValid: Boolean,
    IsValidObject: Boolean,
    Length: Number,
    LevelId: Number,
    LoadClassifications: String,
    LoadName: String,
    Name: String,
    NeutralConductorsNumber: Number,
    OwnerViewId: Number,
    PanelName: String,
    PathOffset: Number,
    Pinned: Boolean,
    PolesNumber: Number,
    PowerFactor: Number,
    PowerFactorState: String,
    PressureLossOfCriticalPath: Number,
    Rating: Number,
    RunsNumber: Number,
    SectionsCount: Number,
    StartSlot: Number,
    SystemType: String,
    TrueCurrent: Number,
    TrueCurrentPhaseA: Number,
    TrueCurrentPhaseB: Number,
    TrueCurrentPhaseC: Number,
    TrueLoad: Number,
    TrueLoadPhaseA: Number,
    TrueLoadPhaseB: Number,
    TrueLoadPhaseC: Number,
    UniqueId: String,
    ViewSpecific: Boolean,
    Voltage: Number,
    VoltageDrop: Number,
    WireSizeString: String,
    WireType: String,
    WorksetId: Number,
    List: EStore
}

var EStore2 = {

}

var RootObject = {
    List: ObjectParameter, 
    List: ObjectTypeParameter,
    List: ElectricalSystem,
    CanFlipFacing: Boolean,
    CanFlipHand: Boolean,
    CanFlipWorkPlane: Boolean,
    CanRotate: Boolean,
    CanSplit: Boolean,
    Category: String,
    CreatedPhaseId: Number,
    DemolishedPhaseId: Number,
    DocumentPath: String,
    FacingFlipped: Boolean,
    FacingOrientationX: Number,
    FacingOrientationY: Number,
    FacingOrientationZ: Number,
    GroupId: Number,
    HandFlipped: Boolean,
    HandOrientationX: Number,
    HandOrientationY: Number,
    HandOrientationZ: Number,
    HasSpatialElementCalculationPoint: Boolean,
    HasSpatialElementFromToCalculationPoints: Boolean,
    Host: String,
    Id: Number,
    Invisible: Boolean,
    IsSlantedColumn: Boolean,
    IsTransient: Boolean,
    IsValidObject: Boolean,
    IsWorkPlaneFlipped: Boolean,
    LevelId: Number,
    LocationX: Number,
    LocationY: Number,
    LocationZ: Number,
    Mirrored: Boolean,
    Name: String,
    OwnerViewId: Number,
    Pinned: Boolean,
    UniqueId: String,
    ViewSpecific: Boolean,
    WorksetId: Number,
    List: EStore2 
}

module.exports = RootObject;
