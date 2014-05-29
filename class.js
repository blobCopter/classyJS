(function initClass(global, namespace) {

    namespace = namespace || "My";
    if (!global[namespace])
        global[namespace] = {};

    var My = global[namespace];

    /********* UTILS *********/
    var Utils = {

        Type: {
            isFun: function (f) { 
                return (typeof f == 'function'); 
            }
        },

        Inheritance : {
	        extend : function( subClass, superClass ) { 
		        var F = function() {};
		        F.prototype = superClass.prototype; 
		        subClass.prototype = new F(); 
		        subClass.prototype.constructor = subClass;
	        }
        },

        Members: {

            isPrivate: function (name) {
                return (name && name.length && name[0] == '_');
            },

            hasAccessors : function (obj) {
                return ((typeof obj == 'object')
                    && (obj.set || obj.get));
            },

            checkAccessRights: function(obj, caller) {
                 if (caller  == Utils.Members.checkAccessRights)
                     return;

                 for (var key in obj) {
                     // Is the calling function a member
                    if (caller == obj[key] || caller._accessor == obj) {
                        return;
                    }
                }
                throw Utils.Errors.privateMember;
            },

            createAccessor: function (obj, fun, isPrivate) {
                
                var accessor;
                if (!isPrivate)
                    accessor = fun.bind(obj);
                else {
                    accessor = function () {
                        Utils.Members.checkAccessRights(obj, accessor.caller)
                        console.log(fun);
                        fun.apply(obj, arguments);
                    };
                }

                fun._accessor = obj;
                return accessor;
             },

            defineProperty: function (obj, name, value) {

                if (!obj || !name || !value) { return; }

                var opt = {
                    configurable: false,
                    enumerable: true
                };

                var isPrivate = Utils.Members.isPrivate(name);

                // Members
                if (!Utils.Members.hasAccessors(value)) {
                    if (!isPrivate) {
                        console.log("public variable " + name);
                        opt.value = value;
                        opt.writable = true;
                    }
                    else {
                        console.log("private variable : " + name);
                        opt.set = Utils.Members.createAccessor(obj, function (val) { value = val; }, isPrivate);
                        opt.get = Utils.Members.createAccessor(obj, function () { return value; }, isPrivate);
                    }
                }
                else {
                    if (value.set && Utils.Type.isFun(value.set))
                        opt.set = Utils.Members.createAccessor(obj, value.set, isPrivate);

                    if (value.get && Utils.Type.isFun(value.get))
                        opt.get = Utils.Members.createAccessor(obj, value.get, isPrivate);
                }

                Object.defineProperty(obj, name, opt);
            },

            init: function (constructor, members, staticMembers) {
                for (key in members)
                    Utils.Members.defineProperty(constructor.prototype, key, members[key]);
                for (key in staticMembers)
                    Utils.Members.defineProperty(constructor, key, staticMembers[key]);
            }

        },

        Errors: {
            privateMember: "Error : Member is private" 
        }

    };

    /********* CLASS *********/
    My.Class = {

        /*
        * define
        */
        define: function (constructor, members, staticMembers) {

            constructor = constructor || function () {};
            members = members || {};
            staticMembers = staticMembers || {};

            Utils.Members.init(constructor, members, staticMembers);

            return constructor;
        },


        derive: function(parent, constructor, members, staticMembers) {

            constructor = constructor || function () {};
            members = members || {};
            staticMembers = staticMembers || {};

            Utils.Inheritance.extend(constructor, parent);
            Utils.Members.init(constructor, members, staticMembers);
            return constructor;
        },

    };

    global[namespace] = My;

})(this, "My");